import { useEffect, useState } from "react";
import { getTag } from "services/tag";

export const ListTagScreen = () => {
  const [listTag, setListTag] = useState<any>([]);
  useEffect(() => {
    const init = async () => {
      await getTag().then((rs) => {
        setListTag(rs.data.data);
      });
    };
    init();
  }, []);
  console.log(listTag);
  
  return <div></div>;
};
