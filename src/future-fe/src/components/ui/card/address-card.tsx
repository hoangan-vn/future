import React, { useRef } from "react";
import CircleBtn from "../../form/button-circle/social-btn";
import { Delete, Edit } from "../../icon";

interface Props {
  address: IAddress;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export default function AddressCard({
  address,
  onDeleteClick,
  onEditClick,
}: Props) {
  const { district, phone, province, receiver, specificAddress, ward } =
    address;
  return (
    <div className="relative group border-[1px] px-4 py-3 border-light-gray overflow-hidden">
      {/* {address.default && (
        <div className="absolute p-2 text-white rounded top-3 right-4 bg-dark-slate-gray text-heading-10">
          Mặc định
        </div>
      )} */}

      <div className="absolute transition-all duration-150 ease-out group-hover:right-4 -right-12 top-1/3">
        <CircleBtn onClick={onEditClick} type="wheat">
          <Edit className="w-5 h-5 text-dark-slate-gray" />
        </CircleBtn>
      </div>
      <div className="absolute transition-all duration-150 ease-out delay-75 group-hover:right-4 -right-12 top-2/3">
        <CircleBtn onClick={onDeleteClick} type="black">
          <Delete className="w-5 h-5 text-white" />
        </CircleBtn>
      </div>
      <p className="text-body-2">{receiver}</p>
      <p className="text-body-2">{phone}</p>
      <p className="w-4/5 text-body-2">{`${specificAddress}, ${ward}, ${district}, ${province}`}</p>
    </div>
  );
}
