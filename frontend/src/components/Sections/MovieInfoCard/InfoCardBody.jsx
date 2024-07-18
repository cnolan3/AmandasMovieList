import { useUser } from "../../../contexts/userContext";
import InfoCard from "../../UI/InfoCard/InfoCard";
import SlideTransition from "../../UI/SlideTransition/SlideTransition";
import styles from "./InfoCardBody.module.scss";
import MovieInfo from "./MovieInfo";
import PlotSection from "./PlotSection";

function InfoCardBody({
  movie,
  stage,
  onClose,
  plotTransitionTo,
  lowerSection,
}) {
  const { myInfo, loggedIn } = useUser();
  const isAmanda = loggedIn ? myInfo.role === "amanda" : false;

  return (
    <InfoCard title={movie.Title} onClose={onClose}>
      <MovieInfo movie={movie}>
        <SlideTransition stageState={stage}>
          {stage ? <PlotSection movie={movie} /> : plotTransitionTo}
        </SlideTransition>
      </MovieInfo>
      {isAmanda && <div className={styles.lowerSection}>{lowerSection}</div>}
    </InfoCard>
  );
}

export default InfoCardBody;

