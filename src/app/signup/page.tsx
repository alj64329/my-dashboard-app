
const signup = () => {
  return (
    <div className="bg-grey-25 min-h-screen">
        <div className="flex justify-center py-20 px-8">
            <h2  className="font-semibold text-grey-400 text-3xl">
                Welcome, create your company account
            </h2>
        </div>
        <div className="flex justify-center flex-col w-fit mx-auto bg-white py-20 px-16">
            <h3 className="text-center font-bold text-lg text-grey-500 pb-13">
                It is our pleasure to have you on board!
            </h3>
            <form action="" id="signup-form"
               className="flex flex-col gap-5">
                <input type="text" name="companyName" id="companyName" 
                placeholder="Enter your company name"
                className="border border-grey-100 font-semibold text-grey-200 rounded-sm py-3 px-4 w-full" />

                <input type="email" name="adminEmail" id="adimnEmail" 
                placeholder="Enter the comapny email"
                className="border border-grey-100 font-semibold text-grey-200 rounded-sm py-3 px-4 w-full" />

                <input type="text" name="amidnName" id="adminName" 
                placeholder="Enter the name of admin"
                className="border border-grey-100 font-semibold text-grey-200 rounded-sm py-3 px-4 w-full" />

                <button type="submit"
                className="text-white mt-4 bg-second-green font-bold py-3 text-lg rounded-lg">
                    Next
                </button>
            </form>
        </div>

    </div>
  )
}

export default signup