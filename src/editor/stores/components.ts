import {create} from 'zustand';

export interface Component {
  /**
   * 组件唯一标识
   */
  // 组件唯一标识
  id: number;
  /**
   * 组件名称
   */
  name: string;
  /**
   * 组件属性
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
  /**
   * 子组件
   */
  children?: Component[];
}

interface State {
  components: Component[];
}

interface Action {
  addComponent: (component: Component) => void;
}

export const  useComponents = create<State & Action>((set) => ({
  components: [],
  addComponent: (component) => set((state) => { return { components: [...state.components, component]}}),
}))
