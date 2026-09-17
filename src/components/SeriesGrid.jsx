import SeriesCard from "./SeriesCard.jsx";

const SeriesGrid = ({ series }) => {
  return (
    <div className="grid-cards">
      {series.map((item) => (
        <SeriesCard key={item.id} series={item} />
      ))}
    </div>
  );
};

export default SeriesGrid;
