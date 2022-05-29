import Zoom from "react-reveal/Zoom";
import { baseImageUrl } from "../../constants/urls";

const FeaturesIcon = ({ amenities }) => {
  return (
    <>
      <div className="featuers">
        <Zoom top cascade>
          {amenities.map((index) => (
            <img
              src={`${baseImageUrl}${index.image}`}
              title={index.name}
              className="iop"
              alt="images"
              key={index.name}
            />
          ))}
        </Zoom>
      </div>
    </>
  );
};

export default FeaturesIcon;
