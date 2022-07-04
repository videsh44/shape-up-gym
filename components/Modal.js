import React from "react";

export default function Modal({ showModal, closeModal, modalTitle, children }) {
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 uppercase border-b border-solid rounded-t border-slate-200">
                  <h3 className="text-3xl font-semibold">{modalTitle}</h3>
                  <div
                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black border-0 outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="block w-6 h-6 text-2xl text-black outline-none cursor-pointer focus:outline-none">
                      ×
                    </span>
                  </div>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">{children}</div>
                {/*footer*/}
                {/* <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                  <button
                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                    type="button"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={closeModal}
                  >
                    Save Changes
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
