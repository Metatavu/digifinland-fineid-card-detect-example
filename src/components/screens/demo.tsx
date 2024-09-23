import { useAtom } from "jotai";
import { authAtom, userProfileAtom } from "../../atoms/auth";

/**
 * Demo component properties
 */
type Props = {
};

/**
 * Demo component.
 */
const DemoScreen = ({ }: Props) => {
  const [userProfile] = useAtom(userProfileAtom);
  const [auth] = useAtom(authAtom);

  if (!auth) {
    return null;
  }

  if (!userProfile) {
    return null;
  }

  return (
    <div style={{
      maxWidth: 800,

    }}>
      <h1>Welcome, {userProfile.firstName} {userProfile.lastName} &lt;{userProfile.email}&gt;</h1>

      <h2>Raw Token (used for authentication)</h2>
      <div>
        <pre style={{
          overflow: "auto",
          textOverflow: "ellipsis",
        }}>{auth.tokenRaw}</pre>
      </div>

      <h2>Token Data</h2>
      <pre>{JSON.stringify(auth.token, null, 2)}</pre>

      <button onClick={() => auth.logout()}>Logout</button>
    </div>
  );
};

export default DemoScreen;