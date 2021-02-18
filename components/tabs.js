import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
const tabs = (props) => {
  return  <Tabs>
    <TabList>
      {
        props.children.map(child => {
          const label = child.props.label;
          return <Tab key={`tab-${child.props.label}`}>{label}</Tab>
        })
      }
    </TabList>
    {
      props.children.map(child => <TabPanel key={`panel-${child.props.label}`}>{child}</TabPanel>)
    }
  </Tabs>
};
export default tabs