import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useQuery } from "@apollo/client";
import { GETUSER } from "../services/graphql/queriesMutations";
import { PuffLoader } from "react-spinners";

type PageProps = {
  allowedRoles: [string];
  children: React.ReactNode;
};

const ProtectedRoute = (props: PageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string>();
  const { loading, error, data } = useQuery(GETUSER, {
    variables: { id: userId },
  });
  const location = useLocation();

  const token = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const decoded: any = jwtDecode(token);
    setUserId(decoded.id);
    setIsLoading(false);
  }, []);

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center p-4 ">
        <PuffLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <>
      {console.log(data)}
      {data && props.allowedRoles?.includes(data?.user?.role) ? (
        props.children
      ) : data ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      ) : (
        <Navigate to="auth/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default ProtectedRoute;
