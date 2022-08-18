import BigNumber from 'bignumber.js';
import * as React from 'react'
import ReactModal from 'react-modal';


const formatBigNumber = (amount: BigNumber | number | string, decimals: number) => {
  return new BigNumber(amount).div(new BigNumber(10).pow(decimals))
}

const toBigNumber = (amount: BigNumber | number | string, decimals: number) => {
  return new BigNumber(amount).times(new BigNumber(10).pow(decimals))
}

const App: React.FC<{ showModal: boolean, hideModal: () => void, currentSelection: string }> = ({ showModal, hideModal, currentSelection }) => {
  const [bigInput, setBigInput] = React.useState('0')
  const [decimals, setDecimals] = React.useState(18)
  const [output, setOutput] = React.useState('0')

  React.useEffect(() => {
    if (!new BigNumber(currentSelection).isNaN()) {
      updateBigInput(currentSelection)
    }
  }, [currentSelection])

  const updateDecimals = (value: number) => {
    setDecimals(value)
    updateBigInput(bigInput, value)
  }

  const updateBigInput = (bigN: string, dec?: number) => {
    setBigInput(bigN)
    setOutput(formatBigNumber(bigN, dec || decimals).toString())
  }

  const updateOutput = (smallN: string, dec?: number) => {
    setOutput(smallN)
    setBigInput(smallN ? toBigNumber(smallN, dec || decimals).toFixed(0) : '0')
  }


  const closeModal = () => {
    hideModal()
  }

  return (
    <>
      <ReactModal isOpen={showModal} className="big-n-content" overlayClassName="big-n-overlay" onRequestClose={closeModal} parentSelector={() => document.querySelector('#big-n-root')!.shadowRoot?.querySelector("#big-n-container")!} >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <div>
            <div style={{ marginBottom: '4px' }}>
              <label className="label" htmlFor="big-number">Big Number</label>
            </div>
            <input name="big-number" className="big-input" placeholder="Big Number" value={bigInput || 0} onChange={e => updateBigInput(e.target.value)} />
          </div>
          <div>
            <div style={{ marginBottom: '4px' }}>
              <label className="label" htmlFor="decimals">Decimals</label>
            </div>
            <input name="decimals" className="small-input" placeholder="Decimals" value={decimals} type="number" onChange={e => updateDecimals(Number(e.target.value))} />
          </div>
          <div>
            <div style={{ marginBottom: '4px' }}>
              <label className="label" htmlFor="output">Output</label>
            </div>
            <input name="output" className="big-input" placeholder="Output" value={output || 0} type="number" onChange={e => updateOutput(e.target.value)} />
          </div>
        </div>
      </ReactModal>
    </>
  )
}

export default App