"use client";

import { useQueryClient } from "@tanstack/react-query";

const HomeComponent = () => {
  const queryClient = useQueryClient();
  console.log(queryClient);
  return <>Movie App</>;
};

export default HomeComponent;
