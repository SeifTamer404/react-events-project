import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function RootLayout() {

  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if(!token){
      console.log('No token found');
      return ;
    }

    if(token==='EXPIRED'){
      console.log('Token expired');
      submit(null, {action: '/logout', method: 'post'});
      return;
    }

    const duration = getTokenDuration();
    setTimeout(() => {
      console.log('Token expired 2');
      submit(null, {action: '/logout', method: 'post'});
    }, duration);

  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default RootLayout;
