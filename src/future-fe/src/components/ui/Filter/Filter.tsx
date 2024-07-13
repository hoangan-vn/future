import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { useAppSelector } from "../../../store/hooks";
import { selectCategories } from "../../../redux/reducers/category-slice";
import {
  Link,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { productApi } from "../../../api/product.api";
import { formatPrice } from "../../../utils/string-utils";
import Button from "../../form/button/button";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<number[]>([0, 100]);
  const [maxPrice, setMaxPrice] = useState(0);

  const categories = useAppSelector(selectCategories);
  const navigate = useNavigate();

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    setValue(newValue as number[]);
  };

  const handleGetMaxPrice = async () => {
    const categoryName = searchParams.get("category");

    const category = categories.find((item) => item.name === categoryName);
    const max = await productApi.getMaxPrice(category?._id);

    setMaxPrice(max);
  };

  const handleApply = async () => {
    setSearchParams((values) => {
      values.append("from", ((value[0] * maxPrice) / 100).toString());
      values.append("to", ((value[1] * maxPrice) / 100).toString());

      return values;
    });
  };

  useEffect(() => {
    handleGetMaxPrice();
  }, [searchParams]);

  return (
    <div className="w-[250px] shrink-0 sticky top-8">
      <h2 className="text-xl font-black">Lọc theo giá</h2>
      <div className="flex justify-between py-4">
        <input
          disabled={true}
          placeholder={`${formatPrice((value[0] * maxPrice) / 100)}`}
          className={
            "w-2/5 border-[1px] px-[7px] py-[5px] text-sm outline-none border-light-gray bg-transparent rounded"
          }
        />
        <span className="text-center">-</span>
        <input
          disabled={true}
          placeholder={`${formatPrice((value[1] * maxPrice) / 100)}`}
          className={
            "w-2/5 border-[1px] px-[7px] py-[5px] text-sm outline-none border-light-gray bg-transparent rounded"
          }
        />
      </div>
      <Slider
        sx={{
          width: "100%",
          color: "rgb(6, 78, 59)",
        }}
        size="small"
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        disableSwap
      />
      <Button
        onClick={handleApply}
        title="Áp dụng"
        variant="secondary"
        className="w-full py-3 text-sm"
      />
      <h2 className="pt-8 text-xl font-black">Danh mục</h2>
      <ul className="flex flex-col">
        {categories.map((cate, index) => (
          <Link
            key={index}
            to={{
              search: `${createSearchParams({
                category: cate.name,
              })}`,
            }}
            className="py-2 text-sm text-gray-500 focus:text-emerald-800"
          >
            {cate.name} ({cate.numberOfProducts})
          </Link>
        ))}
      </ul>
    </div>
  );
}
