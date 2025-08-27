import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TopNav from "../TopNav";
import Sidebar from "../Sidebar";

const MainLayout = () => {
  const navigate = useNavigate();
  const userinfo=JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
   // loadSystemData();
  },[])

// const loadSystemData=async()=>{
//   const result=await isSystemDataExists();

//   const {isExists}=result.data.outputValues;
//   if(userinfo!==null){
//     console.log('kkkkk',isExists);
//     if(isExists===0){
//       const systemInit_SystemInfoData=result.data.results[0][0];
//       const systemInit_Company=result.data.results[1][0];
//       console.log('systemInfoData',result.data.results[0][0]);
//       console.log('systemInit_Company',systemInit_Company);
     
//       if(systemInit_SystemInfoData)
//    localStorage.setItem('systemInit_SystemInfoData',JSON.stringify(systemInit_SystemInfoData));
   
//    if(systemInit_Company)
//    localStorage.setItem('systemInit_Company',JSON.stringify(systemInit_Company));

//     navigate('/systemDataInitialization');   

//     }
//   }

// }

  
  return (
    <div className="">
      <TopNav />
 <div className="flex pt-16 pb-12">
          <Sidebar />
   <main className="flex-1 ml-16 md:ml-64 p-0 overflow-auto">
       <div className="container mx-auto">
          <Outlet />
      </div>  </main>
      </div>
    </div>
  );
};

export default MainLayout;
