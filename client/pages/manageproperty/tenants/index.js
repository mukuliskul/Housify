import AddTenant from "@/components/addTenant";
import Tenant from "@/components/tenant";

export default function Tenants() {
    let tenants = [
        {
            name: "John doe", 
            start_date: "01 Jan, 2023", 
            end_date: "1 Jan, 2024"
        },
        {
            name: "John Cena", 
            start_date: "05 July, 2023", 
            end_date: "6 July, 2025"
        }
        ];
    return (
        <div className="h-[8vh] text-black kumbh-sans-font">
          <h1 className="text-4xl font-bold text-primary mb-10">Tenants</h1>
            <div className="divide-y border-y-[2px] mb-5">
                {tenants.map((t) => (
                <div className="py-5">
                    <Tenant tenant={t} />
                </div>
                ))}
            </div>
            <AddTenant />
        </div>
    );
  }
  