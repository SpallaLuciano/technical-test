import './App.css';
import '@xyflow/react/dist/style.css';
import { ReactFlowProvider } from '@xyflow/react';
import { Graph, GraphWrapper } from './components/Graph';


function App() {
	return <div className='h-screen w-screen bg-gray-300 text-black'>
		<ReactFlowProvider>
			<GraphWrapper>
				<Graph />
			</GraphWrapper>
		</ReactFlowProvider>
	</div>
}
export default App;
