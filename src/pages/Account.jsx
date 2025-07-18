import styled from "styled-components";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const FullWidth = styled.div`
  width: 100%;
`;

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        {/* <Heading as="h3">Update user data</Heading> */}
        <FullWidth>
          <UpdateUserDataForm />
        </FullWidth>
      </Row>

      <Row>
        {/* <Heading as="h3">Update password</Heading> */}
        <FullWidth>
          <UpdatePasswordForm />
        </FullWidth>
      </Row>
    </>
  );
}

export default Account;
