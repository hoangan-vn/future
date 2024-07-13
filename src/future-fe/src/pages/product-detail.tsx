import React, { useEffect, useState } from "react";
import ProductDetail from "../components/ui/product-detail/product-detail";
import { productApi } from "../api/product.api";
import { useParams } from "react-router-dom";
import DescriptionReview from "../components/ui/description-review/descriptionReview";
import FormComment from "../components/ui/form/form-comment";
import { commentApi } from "../api/comment.api";

interface FormValue {
  rate: number;
  review: string;
}

export default function ProductDetailPage() {
  const [product, setProduct] = useState<IProductDetail>();
  const { id } = useParams();
  const handleGetProduct = async () => {
    if (id) {
      const data = await productApi.getProductDetail(id);
      setProduct(data);
    }
  };

  const onSubmit = async (value: FormValue) => {
    console.log("value: ", value);
    console.log(typeof value.rate);
    try {
      const reponse = await commentApi.createComment({
        content: value.review,
        productId: id as string,
        rate: value.rate,
      });
      if (product) {
        const newRate =
          (product.rating * product.comments.length + reponse.rate) /
          (product.comments.length + 1);
        console.log("newRate: ", newRate);
        setProduct({
          ...product,
          rating: newRate,
          comments: [...product.comments, reponse],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <div>
      {product && (
        <>
          <ProductDetail product={product} />
          <DescriptionReview
            comments={product.comments}
            decription={product.description}
          />
          <div className="w-1/2 px-[76px] mt-[90px]">
            <FormComment onSubmit={onSubmit} />
          </div>
        </>
      )}
    </div>
  );
}
