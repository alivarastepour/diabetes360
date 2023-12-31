import RiskAssessmentPageWrapper from "@/components/RiskAssessmentPageWrapper/RiskAssessmentPageWrapper";
import Head from "next/head";

export default function RiskAssessment() {
  return (
    <>
      <Head>
        <title>Diabetes360 | Assess your risk for Diabetes</title>
        <meta
          name="description"
          content="Asess your risk for Diabetes with 2 sets of questioneers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/blue_circle.svg" />
      </Head>
      <RiskAssessmentPageWrapper />
    </>
  );
}
