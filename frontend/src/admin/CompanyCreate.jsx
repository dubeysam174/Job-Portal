import React from 'react'
import Navbar from '@/components/shared/Navbar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companyslice'
import { toast } from 'sonner'
const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
         <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4">
        
        {/* 🔹 Glass Card */}
        <div
          className="
            my-10 p-6 rounded-2xl border shadow-md
            
            bg-white border-gray-200
            
            dark:bg-white/10 
            dark:backdrop-blur-xl 
            dark:border-white/20
          "
        >
          
          {/* Heading */}
          <div className="mb-6">
            <h1 className="font-bold text-2xl text-gray-800 dark:text-white">
              Your Company Name
            </h1>
            <p className="text-gray-500 dark:text-gray-300">
              What would you like to give your company name? You can change this later.
            </p>
          </div>

          {/* Input */}
          <div className="mb-4">
            <Label className="text-gray-700 dark:text-gray-200">
              Company Name
            </Label>
            <Input
              type="text"
              placeholder="JobHunt, Microsoft etc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="
                my-2 
                bg-white text-gray-800 border-gray-300
                
                dark:bg-white/10 
                dark:text-white 
                dark:border-white/20 
                dark:placeholder:text-gray-400
              "
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-8">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="
                dark:border-white/20 
                dark:text-white 
                dark:hover:bg-white/10
              "
            >
              Cancel
            </Button>

            <Button
              onClick={registerNewCompany}
              className="
                bg-black text-white
                
                dark:bg-white 
                dark:text-black 
                dark:hover:bg-gray-200
              "
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default CompanyCreate