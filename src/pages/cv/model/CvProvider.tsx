import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CV_BY_ID } from "../../../shared/api/cvs/cvs.api";
import { Cv } from "../../../shared/api/graphql/generated";
import { CvContext } from "./CvContext";

export const CvProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { cvId } = useParams<{ cvId: string }>();
  const { data, refetch } = useQuery<{ cv: Cv }>(GET_CV_BY_ID, {
    variables: { cvId },
    skip: !cvId,
  });
  console.log("GET_CV_BY_ID QUERY", GET_CV_BY_ID.loc?.source.body);

  return (
    <CvContext.Provider value={{ cv: data?.cv || null, refetch }}>
      {children}
    </CvContext.Provider>
  );
};
