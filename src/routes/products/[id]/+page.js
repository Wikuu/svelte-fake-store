import axios from "../../../config/axios";

export const load = ({ params }) => {
  const fetchProducts = async () => {
    const { data } = await axios.get(`/${params.id}`);
    return data;
  };

  return {
    product: fetchProducts(),
  };
};
