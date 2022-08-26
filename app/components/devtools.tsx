import { useState, useEffect } from 'react';
import { JSONTree } from 'react-json-tree';
import Tooltip from './tool-tip';

export function loader() {
  return;
}

const theme = {
  scheme: 'monokai',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#5d9ccb',
  base0C: '#c8501e',
  base0D: '#c8501e',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

function filterObject(inputObject: any) {
  const unWantedProps = [
    '$',
    '_version',
    'ACL',
    '_owner',
    '_in_progress',
    'created_at',
    'created_by',
    'updated_at',
    'updated_by',
    'publish_details',
  ];
  for (const key in inputObject) {
    unWantedProps.includes(key) && delete inputObject[key];
    if (typeof inputObject[key] !== 'object') {
      continue;
    }
    inputObject[key] = filterObject(inputObject[key]);
  }
  return inputObject;
}

const DevTools = ({ response }: any) => {
  const json = {
    Header: response[0].data.headerRes,
    Footer: response[0].data.footerRes,
    Page: response[1].data,
  };
  const filteredJson = filterObject(json);
  const [forceUpdate, setForceUpdate] = useState(0);

  function copyObject(object: any) {
    navigator.clipboard.writeText(object);
    setForceUpdate(1);
  }

  useEffect(() => {
    if (forceUpdate !== 0) {
      setTimeout(() => setForceUpdate(0), 300);
    }
  }, [forceUpdate]);

  return (
    <div
      className='modal fade'
      id='staticBackdrop'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex={-1}
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'
      role='dialog'>
      <div
        className='modal-dialog .modal-lg modal-dialog-centered modal-dialog-scrollable'
        role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h2 className='devtools-modal-title' id='staticBackdropLabel'>
              JSON Preview
            </h2>
            <span
              className='json-copy'
              onClick={(e) => copyObject(JSON.stringify(filteredJson))}
              aria-hidden='true'>
              <Tooltip
                content={forceUpdate === 0 ? 'Copy' : 'Copied'}
                direction='top'
                dynamic
                delay={200}
                status={forceUpdate}>
                <img src='/copy.svg' alt='copy icon' />
              </Tooltip>
            </span>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            />
          </div>
          <div className='modal-body'>
            {response ? (
              <pre id='jsonViewer'>
                {response && (
                  <JSONTree
                    data={json}
                    theme={theme}
                    hideRoot={true}
                    sortObjectKeys={true}
                    keyPath={[0]}
                  />
                )}
              </pre>
            ) : (
              ''
            )}
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn tertiary-btn modal-btn'
              data-bs-dismiss='modal'>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DevTools;
