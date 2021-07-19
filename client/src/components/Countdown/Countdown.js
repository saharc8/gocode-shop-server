import React, { useEffect, useState } from "react";
import "./Countdown.css";

function Countdown() {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`${year}-10-1`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        // days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        // hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  return (
    <div className="countdown-display">
      <h1 class="blink_me">NOW ! ! ! Summer Sale {year}</h1>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}

export default Countdown;

//-----------------------------------------------------------

// import { React, useEffect, useState } from "react";

// function Countdown({ startSale }) {
//   const [minutes, setMinutes] = useState(1);
//   const [seconds, setSeconds] = useState(5);

//   // useEffect(() => {
//   //   const myInterval = setInterval(() => {
//   //     if (seconds > 0) {
//   //       setSeconds(seconds - 1);
//   //       console.log(1, seconds);
//   //     }
//   //     if (seconds === 0) {
//   //       if (minutes === 0) {
//   //         clearInterval(myInterval);
//   //         console.log(2, seconds);
//   //       } else {
//   //         setMinutes(minutes - 1);
//   //         setSeconds(59);
//   //         console.log(3, seconds);
//   //       }
//   //     }
//   //   }, 1000);
//   // }, []);

//   // useEffect(() => {
//   //   clearInterval(myInterval);
//   // });

//   // useEffect(() => {
//   //   seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
//   // }, [seconds]);

//   return (
//     <div>
//       {minutes === 0 && seconds === 0 ? (
//         <h1
//           onChange={(e) => startSale(console.log(e))}
//           style={{
//             color: "red",
//             fontSize: 50,
//           }}
//         >
//           SALE!!!
//         </h1>
//       ) : (
//         <h1 className="ss">
//           Summer Sale: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
//         </h1>
//       )}
//     </div>
//   );
// }

// export default Countdown;
