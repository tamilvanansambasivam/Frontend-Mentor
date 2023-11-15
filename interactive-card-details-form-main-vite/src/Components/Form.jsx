export default function Form() {
  return (
    <div className="flex">
      <div className="w-[30%] h-screen	">
        {" "}
        <img
          src="../../images/bg-main-desktop.png"
          className="object-cover h-[100%]"
        />
      </div>

      <div className="w-[70%]">
        <div className="flex my-[20%]">
          <div id="card-images " className="w-[50%]">
            <img
              src="../../images/bg-card-front.png"
              alt=""
              className="w-96 h-48 -ml-40 mb-20"
            />

            <img
              src="../../images/bg-card-back.png"
              alt=""
              className="w-96 h-48 -ml-24"
            />
          </div>

          <form className="w-[50%] text-sm">
            <div className="flex flex-col justify-center place-items-center ">
              <div className="space-y-6 ">
                <div className="flex flex-col ">
                  <label className="uppercase py-2 text-xs">
                    Cardholder Name{" "}
                  </label>
                  <input
                    placeholder="e.g. Jane Appleseed "
                    className="shadow-lg border rounded-lg p-2 w-60 "
                  />
                </div>

                <div className="flex flex-col justify-center ">
                  <label className="uppercase py-2  text-xs">Card Number</label>
                  <input
                    placeholder="e.g. 1234 5678 9123 0000"
                    className="shadow-lg border rounded-lg p-2 w-60 "
                  />
                </div>

                <div className="flex gap-x-2">
                  <div className="flex flex-col justify-center">
                    <label className="uppercase py-2  text-xs">
                      Exp. Date (MM/YY)
                    </label>
                    <div className="flex gap-x-2">
                      {" "}
                      <input
                        placeholder="MM"
                        className="shadow-lg border rounded-lg p-2 w-16 "
                      />
                      <input
                        placeholder="YY"
                        className="shadow-lg border rounded-lg  p-2 w-16   "
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center ">
                    <label className="uppercase py-2  text-xs">CVC</label>
                    <input
                      placeholder=" e.g. 123"
                      className="shadow-lg border rounded-lg  p-2 w-24 "
                    />
                  </div>
                </div>

                <button className="btn w-60 "> Confirm </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
