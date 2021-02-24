import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Rest, Node, GraphQL, CLI } from './icons'
const tabs = (props) => {
  return  <Tabs>
    <TabList>
      {
        props.children.map(child => {
          const label = child.props.label;
          let icon;
          if (label === 'REST')
            icon = Rest;
          if (label === 'Node.js')
            icon = Node;
          if (label === 'GraphQL')
            icon = GraphQL;
          if (label === 'CLI')
            icon = CLI;
          return (
            <Tab key={`tab-${child.props.label}`}>
              <div className="label-icon">{icon}</div>
              <div className="label-text">{label}</div>
            </Tab>
          )
        })
      }
    </TabList>
    {
      props.children.map(child => <TabPanel key={`panel-${child.props.label}`}>{child}</TabPanel>)
    }
  </Tabs>
};
export default tabs