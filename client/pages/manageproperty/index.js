import Navbar from "@/components/navbar.js";
import Property from "@/components/property.js";
import AddProperty from "@/components/addProperty.js";
export default function ManageProperty() {
  let houses = ["99 xyz avenue, North York, ON M2H 2K1", "999 xyz street, North York, ON M2H 2K1"];
  return (
    <>
      <div className="w-[100%] gap-y-[40px] h-[100vh] text-black kumbh-sans-font">
        <p className="sm:text-left text-center w-[90%] sm:ml-[5px] sm:w-auto mx-auto my-[10px] text-primary font-[600] text-[35px]">
          Manage Property
        </p>
        <div className="lg:w-[80%] mx-auto flex flex-col sm:flex-row justify-around items-center sm:flex-wrap">
          {houses?.map((house) => {
            return (
              <Property address={house} key={house} className="m-[50px]"/>
            )
            })
          }
          <AddProperty className="m-[50px]"/>
        </div>
      </div>
    </>
  );
}
