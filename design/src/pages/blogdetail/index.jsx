import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getAPIData } from "@/http/api";
import { QueryKeys } from "@/constant/keys";
import JustDetail from "@/components/detail";
const Detail = () => {
  const { id } = useParams(); 

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: async () => {
      const response = await getAPIData(`products?populate=*`); 
      return response.data;
    },
    enabled: !!id,
  });
  console.log(data,"off");

  if (isLoading) return <p>Loading blog details...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;
  const productId = parseInt(id, 10);

  const leyla = data?.find((p) => p.id === productId);
  console.log(leyla);
  if (!leyla) return <p>Product not found</p>;


  return (
    
    <div className="px-[160px]">
      
          <JustDetail
      key={leyla.id}
      name={leyla.name}
      oldp={leyla.oldp}
      announcement={leyla.announcement}
      newp={leyla.newp}
      image={
        leyla.image?.url
          ? `http://localhost:1337${leyla.image.url}`
          : "https://dummyimage.com/150"
      }
      colors={[leyla.colors?.[0]?.name]} 
      sale={leyla.sale}
      rating={leyla.rating}
    />
        
    </div>
  );
};

export default Detail;
