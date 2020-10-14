import React, { FC, useEffect, useRef, useState } from "react";
import randomWords from "random-words";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
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



const Practice: FC = () => {
  const textInput = useRef<HTMLInputElement>(null);
  const words = useRef<HTMLParagraphElement>(null);
  // const modal = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(0);
  const [wpmCount, setWpmCount] = useState<string>("0");
  const [errorCount, setErrorCount] = useState<number>(0);
  const [timeStamp, setTimeStamp] = useState<number>(0);

  useEffect(() => {
    if (count != 0) {
      let isError: boolean = Array.from(
        words.current!.children[count - 1].children
      ).some(
        (child) =>
          child.classList.contains("bg-danger") &&
          !child.classList.contains("whitespace")
      );

      if (isError) {
        words.current!.children[count - 1].classList.add("contains-error");
      }
    }
  }, [count]);

  const countErrors = () => {
    setErrorCount(0);
    Array.from(words.current!.children).forEach((child) => {
      if (
        child.classList.contains("contains-error") &&
        !child.classList.contains("whitespace")
      ) {
        setErrorCount((prev) => (prev += 1));
      }
    });
  };

  const calculateStats = () => {
    countErrors();
    let wpm =
      (count - errorCount) / ((new Date().getTime() - timeStamp) / 60000);
    setWpmCount(wpm.toPrecision(4));
  };

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

        document.addEventListener("keyup", (e) => {
          if (e.code === "Space") {
            setCount(count + 1);
            textInput.current!.value = "";
          }
        });
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
              onFocus={() => {
                setTimeStamp(new Date().getTime());
              }}
            />
          </div>
          <div className="col-4 row">
            <div className="text-center mx-3">
              <button
                className="btn btn-primary"
                data-target="#stats"
                data-toggle="modal"
                onClick={calculateStats}
              >
                {" "}
                Check Stats{" "}
              </button>
            </div>
            <div className="text-center mx-3">
              <button className="btn btn-primary align-middle px-2" onClick= {
                e => {
                  window.location.reload();
                }
              }>
                <img
                  src={refreshImage}
                  alt="restart"
                  style={refreshImageStyle}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal"
        id="stats"
        role="dialog"
        onClick={(e: any) => {
          if (e.target.classList.contains("modal")) {
            window.location.reload();
          }
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="col-4 text-center text-uppercase">
                  <span className="font-weight-bold">{wpmCount} </span>
                  wpm
                </div>
                <div className="col-4 text-center text-uppercase">
                  <span className="font-weight-bold">{errorCount} </span>
                  error words
                </div>
                <div className="col-4 text-center text-uppercase">
                  <span className="font-weight-bold">{count} </span>
                  words typed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
