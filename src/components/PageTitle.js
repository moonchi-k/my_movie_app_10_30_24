import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title> {title} | GJFLEX</title>
    </Helmet>
  );
};

export default PageTitle;
