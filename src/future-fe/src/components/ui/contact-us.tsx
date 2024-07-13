import React from "react";
import Accordion from "./Accordion/Accordion";
import Input from "../form/input/input";
import TextArea from "../form/input/text-area";
import Button from "../form/button/button";

export default function ContactUsFreqQuestionAndForm() {
  return (
    <div className="flex gap-x-[70px]">
      <div className="w-[585px] space-y-[30px]">
        <h1 className="font-black text-heading-5 !mb-[50px]">
          Frequently asked questions
        </h1>

        <Accordion
          title="How to by a product?"
          content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae adipisci voluptas quibusdam rem eos possimus quas praesentium, quia iure hic iusto, culpa asperiores aut labore. Odit officia dicta similique corporis? Ab optio voluptatibus aspernatur cum excepturi, impedit, corrupti quibusdam aliquid tempore esse, itaque voluptate maiores incidunt laborum sint eius reprehenderit ea consequuntur? Amet saepe, nam corporis aspernatur facilis aliquam rerum!"
        />
        <Accordion
          title="How can I make refund from your website?"
          content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae adipisci voluptas quibusdam rem eos possimus quas praesentium, quia iure hic iusto, culpa asperiores aut labore. Odit officia dicta similique corporis? Ab optio voluptatibus aspernatur cum excepturi, impedit, corrupti quibusdam aliquid tempore esse, itaque voluptate maiores incidunt laborum sint eius reprehenderit ea consequuntur? Amet saepe, nam corporis aspernatur facilis aliquam rerum!"
        />
        <Accordion
          title="How to by a product?"
          content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae adipisci voluptas quibusdam rem eos possimus quas praesentium, quia iure hic iusto, culpa asperiores aut labore. Odit officia dicta similique corporis? Ab optio voluptatibus aspernatur cum excepturi, impedit, corrupti quibusdam aliquid tempore esse, itaque voluptate maiores incidunt laborum sint eius reprehenderit ea consequuntur? Amet saepe, nam corporis aspernatur facilis aliquam rerum!"
        />
        <Accordion
          title="Why can't I select next day delivery?"
          content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae adipisci voluptas quibusdam rem eos possimus quas praesentium, quia iure hic iusto, culpa asperiores aut labore. Odit officia dicta similique corporis? Ab optio voluptatibus aspernatur cum excepturi, impedit, corrupti quibusdam aliquid tempore esse, itaque voluptate maiores incidunt laborum sint eius reprehenderit ea consequuntur? Amet saepe, nam corporis aspernatur facilis aliquam rerum!"
        />
      </div>
      <form className="space-y-[30px]">
        <h3 className="font-bold text-heading-5 !mb-[50px]">Contact Us</h3>
        <div className="flex gap-x-5">
          <Input
            variation="outlined"
            label="Your Name"
            placeholder="Write your name here..."
          />
          <Input
            variation="outlined"
            label="Your Email"
            placeholder="Write your email here..."
          />
        </div>
        <TextArea
          label="Your Message"
          placehodler="Write your review here"
          className="w-full h-40"
        />
        <Button
          title="Send"
          variant="primary"
          className="py-3 font-medium text-white px-14"
        />
      </form>
    </div>
  );
}
