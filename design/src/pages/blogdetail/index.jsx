import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAPIData, postAPIData } from "../../http/api"; 
import { QueryKeys } from "@/constant/keys";
import JustDetail from "@/components/detail";
import ReactStars from "react-stars";
import SharedComments from "@/components/comments/index"; 

const Detail = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  console.log("Product ID from URL:", productId);


  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: async () => {
      const response = await getAPIData(`products?populate=*`);
      console.log("Available Product IDs in Strapi:", response.data.map(p => p.id));

      return response.data;
    },
    enabled: !!id, 
  });

  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    desc: "",
    stars: 0,
  });

  const leyla = data?.find((p) => p.id === productId) || null;

  useEffect(() => {
    if (leyla?.comments) {
      setComments([...leyla.comments]); 
    }
  }, [leyla]); 

  const { mutate, isPending } = useMutation({
    mutationKey: ["AddComment"],
    mutationFn: async () => {
      const commentPayload = {
        name: form.name,
        desc: form.desc,
        stars: form.stars,
      };

      console.log(" POST :", commentPayload);

      return await postAPIData("/comments", { data: commentPayload });
    },
    onSuccess: (response) => {
      console.log(" success:", response);
      console.log(" Data:", form);

      setComments((prevComments) => [
        { ...form, created_at: new Date().toISOString() },
        ...prevComments,
      ]);

      setForm({
        name: "",
        desc: "",
        stars: 0,
      });
    },
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) return <p>Loading product details...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;
  if (!leyla) return <p>Product not found</p>; 

  return (
    <div className="px-[160px]">
      <JustDetail
        key={leyla.id}
        name={leyla.name}
        oldp={leyla.oldp}
        announcement={leyla.announcement}
        newp={leyla.newp}
        image={leyla.image?.url ? `http://localhost:1337${leyla.image.url}` : "https://dummyimage.com/150"}
        colors={[leyla.colors?.[0]?.name]}
        sale={leyla.sale}
        rating={leyla.rating}
      />

      <div className="my-10">
        <h2 className="text-lg font-medium mb-4">Comments</h2>
        <div className="flex flex-col space-y-4">
          {comments.map((el, index) => (
            <SharedComments
              key={index}
              PersonName={el?.name}
              Time={el?.created_at}
              StarCount={el?.stars}
              Title={el?.desc}
            />
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
        >
          <h3 className="text-lg font-bold mb-2">Add a comment</h3>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              onChange={handleChange}
              value={form.name}
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Comment</label>
            <textarea
              onChange={handleChange}
              value={form.desc}
              name="desc"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              rows="3"
              placeholder="Enter your comment"
            />
          </div>

          <div className="mb-4">
            <ReactStars
              count={5}
              value={form.stars}
              onChange={(e) => setForm({ ...form, stars: e })}
              size={24}
              color2={"#ffd700"}
            />
          </div>

          <button
            className="bg-footbg  hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {isPending ? "Loading..." : "Add Comment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Detail;
