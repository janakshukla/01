import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setlength] = useState(0);
  const [numall, setnumall] = useState(false);
  const [charall, setcharall] = useState(false);
  const [pass, setpass] = useState("");

  const passref=useRef(null)
  const copypasstoclip = useCallback (()=>{
    passref.current?.select();
    passref.current?.setSelectionRange(0,21)
    window.navigator.clipboard.writeText(pass)
  },[pass])

  const passwordgenrator = useCallback(() => {
    let passw = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    if (numall) str += "123456789";
    if (charall) str += "@#$%^&*";

    for (let i = 0; i <= length; i++) {
      let charac = Math.floor(Math.random() * str.length + 1);
      passw += str.charAt(charac);
    }
    setpass(passw);
  }, [length, numall, charall, setpass]);

  useEffect(() => {
    passwordgenrator();
  }, [length, numall, charall, passwordgenrator]);

  return (
    <>
      <div className="h-screen w-screen bg-slate-600 justify-center items-center flex">
        <div className="bg-slate-500 shadow-lg shadow-slate-500 h-1/2 w-1/3 ">
          <div className="flex shadow-lg  rounded-lg overflow-hidden">
            <input
              className="w-3/4  m-2 p-4 rounded-lg"
              type="text"
              value={pass}
              placeholder="PASSWORD"
              readOnly
              ref={passref}

            />
            <button
            onClick={copypasstoclip}
            
            className="text-center bg-blue-600 text-white p-2 w-1/4 text-xl font-semibold">
              copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={8}
                max={20}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setlength(e.target.value);
                }}
                name=""
                id=""
              />
              <label> length:{length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="numberin"
                defaultChecked={numall}
                onChange={() => {
                  setnumall((prev) => !prev);
                }}
              />
              <label htmlFor="numberin">numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="charin"
                defaultChecked={charall}
                onChange={() => {
                  setcharall((prev) => !prev);
                }}
              />
              <label htmlFor="charin">character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
