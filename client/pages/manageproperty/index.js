import { useState } from "react";
export default function AddProperty() {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    fetch("/api/addPropertyApi", { method: "POST", body: formData });
  }
  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="text-black w-full h-[600px] ml-[30px] mt-[30px] flex flex-col justify-around items-center"
    >
      <label>
        Postal Code:
        <input
          type="text"
          name="postal-code"
          id="postal-code"
          placeholder="Postal Code"
          pattern="^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$"
          class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          required
        />
      </label>

      <label
        className="w-[400px] block mb-2 text-sm font-medium text-gray-900"
        htmlFor="title-certificate"
      >
        Title Certificate
        <input
          name="title-certificate"
          type="file"
          className="w-full text-black text-lg bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-primary file:hover:bg-[#062f9e] file:text-white rounded"
          required
        />
      </label>
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor="property-tax-receipts"
      >
        Property Tax Receipts
        <input
          name="property-tax-receipts"
          type="file"
          className="w-full text-black text-lg bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-primary file:hover:bg-[#062f9e] file:text-white rounded"
          multiple
        />
      </label>
      <button
        className="w-[215px] bg-primary h-[51px] rounded-2xl"
        type="submit"
      >
        <p className="py-[5px] text-[20px] font-[500] text-white text-center">
          Submit
        </p>
      </button>
    </form>
  );
}
