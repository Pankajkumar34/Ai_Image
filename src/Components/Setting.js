import React, { useEffect, useState } from "react";
import { checkApiKey } from "./Utils/chekKey";

const Setting = ({ modalOpen, setModalOpen }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [input, setInput] = useState("");

  const saveKey = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    const keys = input;

    try {
      await checkApiKey(keys);
      window.localStorage.setItem("api-key", keys);
      console.log("works");
      setModalOpen(false);
    } catch (error) {
      console.log("doesnt work");
      setErrorMsg("error: incorrect keys");
    }

    setLoading(false);
  };

  const removeApiKey = () => {
    window.localStorage.removeItem("api-key");
    setInput("");
  };

  useEffect(() => {
    if (modalOpen) {
      setInput(window.localStorage.getItem("api-key") || "");
    }
  }, [modalOpen]);

  return (
    <>
      <form onSubmit={saveKey} className="flex flex-col items-center justify-center gap-2" suppressHydrationWarning={true}>

        <p  className="text-lg font-semibold"  >Use your own API-key.</p>
        <span  >Keys are saved in your own browser</span> 

         <div className="italic">
          Get OpenAI API key{" "}
          <a
            className="text-blue-600"
            rel="noreferrer"
            target="_blank"
            href="https://platform.openai.com/account/api-keys"
          >
            here
          </a>
          .
        </div> 
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="password"
          className="w-full max-w-xs input input-bordered"
        />
        <button disabled={loading} type="submit" className="w-full max-w-xs btn btn-outline" suppressHydrationWarning={true}>
          {loading ? (
            <span className="w-56 progress progress-info" />
          ) : (
            "save to localStorage"
          )}
        </button>
        {input && (
          <span
            onClick={removeApiKey}
            disabled={loading}
            className="w-full max-w-xs btn btn-error"
          >
            remove keys
          </span>
        )}
      </form>
    <p>{errorMsg}</p>

    </>
  );
};

export default Setting;
