import axios from "../../../config/axios";

export const load = ({ params }) => {
  const fetchCategoryProducts = async () => {
    const { data } = await axios.get(`/category/${params.category}`);
    return data;
  };

  return {
    products: fetchCategoryProducts(),
  };
};
