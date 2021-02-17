import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
const tabs = (props) => {
  console.log(props.children)
  return  <Tabs>
    <TabList>
      {
        props.labels.map(label => <Tab key={label}>{label}</Tab>)
      }
    </TabList>
    {
      props.children.map(child => <TabPanel>{child}</TabPanel>)
    }
  </Tabs>
};
export default tabs