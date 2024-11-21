import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from './ui/button'

export const ConnectButton = () => {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    className="font-bold text-md rounded-xl hover:scale-105 transition-all duration-300"
                  >
                    Login
                  </Button>
                )
              }
              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    className="font-bold text-md rounded-xl hover:scale-105 transition-all duration-300"
                  >
                    Switch Network
                  </Button>
                )
              }
              return (
                <button
                  type="button"
                  onClick={openAccountModal}
                  className="flex flex-row rounded-xl overflow-hidden bg-white items-center hover:scale-105 transition-all duration-300"
                >
                  <div className="text-md font-bold bg-gray-200 text-black rounded-xl py-1.5 px-3 m-0.5">
                    {account.displayName}
                  </div>
                </button>
              )
            })()}
          </div>
        )
      }}
    </RainbowConnectButton.Custom>
  )
}
