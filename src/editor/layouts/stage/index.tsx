import React from 'react';
import { Button } from 'antd';
import { useDrop } from 'react-dnd';
import Space from '../../components/space';
import { Component, useComponents } from '../../stores/components';
import { ItemType } from '../../item-type';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ComponentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
};

const Stage: React.FC = () => {

  const { components } = useComponents();

  const renderComponents = (components: Component[]): React.ReactNode => {
    return components.map((component: Component) => {
      if (!ComponentMap[component.name]) {
        return null;
      }
      if (ComponentMap[component.name]) {
        return React.createElement(
          ComponentMap[component.name],
          { key: component.id, id: component.id, ...component.props },
          component.props.children || renderComponents(component.children || [])
        );
      }
      return null;
    });
  };

  const [{ canDrop }, drop] = useDrop(() => ({

    accept: [
      ItemType.Space,
      ItemType.Button,
    ],

    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;

      return { id: 0 };
    },

    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} style={{border: canDrop ? '1px solid #ccc' : 'none'}} className='p-[24px] h-[100%]'>
      {renderComponents(components)}
    </div>
  );
};

export default Stage;
