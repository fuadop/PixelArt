import React, { FC, useEffect, useRef, useState } from "react";
import randomWords from "random-words";
import Navbar from "../Navbar";
import { ImageStyle } from "../interfaces";
import refreshImage from "../images/refresh-page-option.svg";

const refreshImageStyle: ImageStyle = {
  width: "1rem",
};

const wordsArray: string[] = randomWords(200) as string[];
function fetchWords(): any {
  return wordsArray.map((val: string, index: number) => {
    return (
      <span key={index} className="d-inline-block">
        {val.split("").map((letter, ind) => (
          <span key={ind} className="d-inline-block">
            {letter}
          </span>
        ))}
        <span
          key={index + 10000}
          className="whitespace d-inline-block"
          style={{
            width: "1rem",
          }}
        ></span>
      </span>
    );
  });
}

// function onfocusevent(e: any) {

// }

const Practice: FC = () => {
  const textInput = useRef<HTMLInputElement>(null);
  const words = useRef<HTMLParagraphElement>(null);
  const [count, setCount] = useState(0);

  const onchangeevent = () => {
    let text = textInput.current!.value;
    text.split("").map((_, index) => {
      if (words.current!.children[count].classList.contains("whitespace")) {
        setCount(count + 1);
      } else {
        if (
          text[index] ===
          words.current!.children[count].children[index].textContent
        ) {
          words.current!.children[count].children[index].classList.add(
            "bg-success"
          );
        } else {
          words.current!.children[count].children[index].classList.add(
            "bg-danger"
          );
        }

        if (
          words.current!.children[count].textContent!.length === text.length
        ) {
          document.addEventListener("keyup", (e) => {
            if (e.code === "Space") {
              setCount(count + 1);
              textInput.current!.value = "";
            }
          });
        }
      }
    });
  };

  return (
    <div>
      <Navbar path="/practice" />
      <div className="container">
        <p
          id="words"
          className="mt-5 px-5 py-3 bg-light rounded"
          ref={words}
          style={{
            fontSize: "1.2rem",
          }}
        >
          {fetchWords()}
        </p>
        <div className="row">
          <div className="col-8">
            <input
              type="text"
              className="form-control"
              ref={textInput}
              onChange={onchangeevent}
            />
          </div>
          <div className="col-4 row">
            <div className="text-center mx-3">
              <button className="btn btn-primary">1:59</button>
            </div>
            <div className="text-center mx-3">
              <a className="btn btn-primary align-middle px-2" href="/practice">
                <img
                  src={refreshImage}
                  alt="restart"
                  style={refreshImageStyle}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
