import ComponentItem from "../../common/component-item";
import { ItemType } from "../../item-type";
import { useComponents } from "../../stores/components";

const Material: React.FC = () => {

  const { addComponent } = useComponents();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (dropResult: any) => {
    addComponent({
      id: new Date().getTime(),
      name: dropResult.name,
      props: dropResult.props,
    });
  }

  return (
    <div className='flex p-[10px] gap-4 flex-wrap'>
      <ComponentItem onDragEnd={onDragEnd} description='按钮' name={ItemType.Button} />
      <ComponentItem onDragEnd={onDragEnd} description='间距' name={ItemType.Space} />
    </div>
  )
}

export default Material;
