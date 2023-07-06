const { createCanvas } = require("canvas");
const Chart = require("chart.js/auto");
const fs = require("fs");

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const randColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const calculateNumberOfRequestAllocated = () => {
  const data = fs.readFileSync("./logs.txt", { encoding: "utf8", flag: "r" });
  const server1 = (data.match(/jobfinder-be-server1/g) || []).length - 83;
  const server2 = (data.match(/jobfinder-be-server2/g) || []).length - 83;
  return {
    server1,
    server2,
    total: server1 + server2,
  };
};

const drawPieGraph = (analysisData) => {
  console.log(
    Object.entries(analysisData).map(
      ([key, value]) => `${capitalizeFirstLetter(key)}: ${value}`
    )
  );

  console.log(Object.values(analysisData).slice(0, -1));

  console.log(Object.values(analysisData).map(() => randColor()));

  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext("2d");

  const data = {
    labels: Object.entries(analysisData).map(
      ([key, value]) => `${capitalizeFirstLetter(key)}: ${value}`
    ),
    datasets: [
      {
        data: Object.values(analysisData).slice(0, -1).concat([null]),
        backgroundColor: Object.values(analysisData).map(() => randColor()),
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  new Chart(ctx, {
    type: "pie",
    data: data,
    options: options,
  });

  fs.writeFileSync("requestAllocation.png", canvas.toBuffer());
};

drawPieGraph(calculateNumberOfRequestAllocated());
