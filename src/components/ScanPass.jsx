import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import {
  getParticipantById,
  updateParticipant,
} from "../firebase/helpers/firestoreHelpers";

export default function Scan() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [message, setMessage] = useState("");
  const [cameraError, setCameraError] = useState("");
  const [direction, setDirection] = useState("inside"); // track entry/exit
  const [switchCard, setSwitchCard] = useState(null); // participant for switch card

  useEffect(() => {
    let animationId;
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true);
        await videoRef.current.play();

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const scanLoop = () => {
          if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
            canvas.height = videoRef.current.videoHeight;
            canvas.width = videoRef.current.videoWidth;
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

            const imageData = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
              handleScan(code.data);
              stopCamera();
              return;
            }
          }
          animationId = requestAnimationFrame(scanLoop);
        };

        animationId = requestAnimationFrame(scanLoop);
      } catch (err) {
        console.error(err);
        setCameraError("🚫 Unable to access camera");
      }
    };

    const stopCamera = () => {
      setScanning(false);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      cancelAnimationFrame(animationId);
    };

    if (scanning) startCamera();

    return () => {
      stopCamera();
    };
  }, [scanning]);

  const handleScan = async (data) => {
    try {
      const participant = await getParticipantById(data);
      if (!participant) {
        setMessage("❌ No participant found with this QR!");
        return;
      }

      if (participant.isUsed) {
        // Show switch card instead of alert
        setSwitchCard(participant);
      } else {
        await updateParticipant(participant.participantId, { isUsed: true });
        participant.isUsed = true;
        setDirection("inside");
        setMessage("✅ Participant verified successfully (INSIDE)");
      }

      setScanResult(participant);
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error verifying participant!");
    }
  };

  const handleSwitchDirection = async (participant, approve) => {
    if (approve) {
      const newDirection = direction === "inside" ? "outside" : "inside";
      await updateParticipant(participant.participantId, {
        isUsed: newDirection === "inside",
      });
      participant.isUsed = newDirection === "inside";
      setDirection(newDirection);
      setMessage(`✅ Participant status updated: now ${newDirection.toUpperCase()}`);
      setScanResult(participant);
    } else {
      setMessage("❌ No changes made.");
    }
    setSwitchCard(null);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-[#800000] mb-6">
        QR Code Scanner
      </h1>

      <p className="text-lg font-semibold text-[#800000] mb-2">
        Entry Pass Scanner
      </p>

      <div className="relative w-80 h-80 border-4 border-dashed border-[#800000] rounded-lg mb-2 flex items-center justify-center">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
        {!scanning && <p className="text-gray-600 z-10">[Camera Preview Here]</p>}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4 mb-4">
        {!scanning && (
          <button
            onClick={() => {
              setScanResult(null);
              setMessage("");
              setCameraError("");
              setScanning(true);
            }}
            className="px-6 py-2 bg-[#800000] text-white rounded-lg shadow hover:bg-[#a83232]"
          >
            {scanResult ? "Scan Another QR" : "Start Scanning"}
          </button>
        )}
        {scanning && (
          <button
            onClick={() => setScanning(false)}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-700"
          >
            Back
          </button>
        )}
      </div>

      {/* Camera Error */}
      {cameraError && <p className="mt-2 text-red-600 font-semibold">{cameraError}</p>}

      {/* Message Card */}
      {message && (
        <div className="w-full max-w-md p-4 mb-2 rounded-lg shadow bg-white border-l-4 border-green-600 text-green-800 font-semibold">
          {message}
        </div>
      )}

      {/* Switch Direction Card */}
      {switchCard && (
        <div className="w-full max-w-md p-4 mb-2 rounded-lg shadow bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 font-semibold">
          ⚠️ Ticket already {direction === "inside" ? "entered" : "exited"}!
          <div className="mt-2 flex gap-4">
            <button
              onClick={() => handleSwitchDirection(switchCard, true)}
              className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
            >
              Switch Direction
            </button>
            <button
              onClick={() => handleSwitchDirection(switchCard, false)}
              className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Participant Details */}
      {scanResult && (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-[#800000]">
            Participant Details
          </h2>
          <p>
            <strong>ID:</strong> {scanResult.participantId}
          </p>
          <p>
            <strong>Name:</strong> {scanResult.name}
          </p>
          <p>
            <strong>Age:</strong> {scanResult.age}
          </p>
          <p>
            <strong>Mobile:</strong> {scanResult.mobile}
          </p>
          <p>
            <strong>Gender:</strong> {scanResult.gender}
          </p>
          <p>
            <strong>Group Size:</strong> {scanResult.groupSize}
          </p>
          <p>
            <strong>Payment ID:</strong> {scanResult.paymentId}
          </p>
          <p>
            <strong>Direction:</strong>{" "}
            {direction === "inside" ? (
              <span className="text-green-600">OUTSUDE ➡️ INSIDE</span>
            ) : (
              <span className="text-red-600">INSIDE ➡️ OUTSIDE</span>
            )}
          </p>
          <p>
            <strong>Entered:</strong>{" "}
            {scanResult.isUsed ? (
              <span className="text-green-600">Yes</span>
            ) : (
              <span className="text-red-600">No</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
