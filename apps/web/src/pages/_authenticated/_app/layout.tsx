import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Box, FileText, Search } from 'lucide-react'
import { useState } from 'react'
import colors from 'tailwindcss/colors'

import { Link } from '@/components/link'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Provider } from './-provider'

export const Route = createFileRoute('/_authenticated/_app')({
  component: AppLayout,
})

const LINKS = {
  inventoryControl: [
    { name: 'Overview', path: '/inventory-control' },
    { name: 'Inventory', path: '/inventory-control/inventory' },
    { name: 'Reports', path: '/inventory-control/reports' },
  ],
  serviceOrder: [
    { name: 'Overview', path: '/' },
    { name: 'Customers', path: '/customers' },
    { name: 'Services', path: '/services' },
    { name: 'Service Ordem', path: '/service-order' },
  ],
} as const

function AppLayout() {
  const [activeSection, setActiveSection] =
    useState<keyof typeof LINKS>('serviceOrder')

  return (
    <Provider>
      <div className="min-h-screen w-full">
        <div className="h-fit bg-zinc-900 px-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div>
                <svg
                  height="32"
                  viewBox="110 120 100 100"
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <g transform="scale(0.16108) translate(680.053 745.254)">
                      <path
                        d="M328.108,308.623h93.377c-1.458,27.18-7.259,54.436-19.367,80.762 c-2.01,4.369-5.433,5.049-8.004,4.551c-11.472-2.221-36.795-6.623-63.999-9.191c-6.706-0.633-7.379,6.08-7.379,6.08v9.52 c0,0-0.061,6.102,5.893,6.389c15.452,0.752,42.46,4.836,54.863,7.453c3.804,0.801,3.84,4.617,2.642,6.541 c-14.67,23.568-47.241,63.457-59.088,77.432c-4.187,4.939-4.293,10.43-4.293,10.43v21.236c0,0,0.106,6.59,7.971,6.389 c127.979-3.256,230.735-109.617,230.735-238.572c0-129.262-103.276-234.854-231.644-238.602c-2.347-0.07-7.118,0.881-7.118,6.373 c0,5.813-0.08,14.414-0.017,21.041c0.015,1.605-0.005,5.137,2.876,8.316c10.145,11.209,42.84,45.654,62.405,79.676 c0.997,1.738,2.143,5.744-2.1,7.139c-11.079,3.643-37.724,7.527-56.788,7.527c-6.398,0-6.338,6.82-6.338,6.82v8.053 c0,0-0.789,6.289,6.783,6.49c21.9,0.588,51.313-5.016,64.957-8.6c6.365-1.674,7.816,1.809,8.588,3.688 c9.164,22.264,16.387,47.266,18.094,74.43c0.431,6.857-5.917,6.664-5.917,6.664h-87.133c-5.462,0-5.355,5.074-5.355,5.074v11.715 C322.753,309.363,328.108,308.623,328.108,308.623z M515.069,286.656h-64.925c0,0-6.588,0.438-6.992-7.135 c-1.564-29.381-9.351-56.232-18.755-79.764c-0.697-1.742-1.833-5.168,2.833-6.553c18.454-5.471,34.129-11.25,46.706-16.031 c4.276-1.625,6.278,1.039,7.317,2.43c21.347,28.588,35.637,63.088,38.431,100.631C520.195,287.094,515.069,286.656,515.069,286.656z M410.42,169.656c-8.127-15.109-25.324-44.096-40.302-60.5c-1.491-1.633,0.486-3.365,2.902-2.729 c32.546,8.559,61.839,25.221,85.573,47.701c1.347,1.273,3.021,4.092-0.535,5.623c-11.011,4.732-24.676,8.711-39.934,13.168 C413.289,174.332,411.372,171.424,410.42,169.656z M365.937,486.869c17.386-21.055,31.87-41.258,43.601-62.658 c0.663-1.213,3.266-3.244,6.341-2.461c16.229,4.117,30.424,8.834,41.979,13.682c3.635,1.521,2.913,3.639,1.998,4.52 c-25.567,24.635-57.734,42.467-93.553,50.551C364.876,490.822,363.619,489.674,365.937,486.869z M472.629,417.572 c-12.65-5.086-28.622-10.416-47.146-15.994c-4.506-1.357-2.853-4.238-2.206-5.779c11.244-26.76,17.968-53.912,19.858-81.385 c0.419-6.088,6.275-5.791,6.275-5.791h65.415c0,0,5.368-0.297,4.971,5.084c-2.802,37.887-16.587,72.92-38.278,101.619 C478.822,418.893,474.521,418.33,472.629,417.572z"
                        fill={colors.lime[300]}
                      />
                      <path
                        d="M296.786,451.125l-0.615,87.994c0,3.902-3.193,7.1-7.099,7.1h-17.107 c-3.906,0-8.039-3.055-9.187-6.787l-11.151-36.242c-1.15-3.73-5.128-7.77-8.842-8.975l-47.845-19.811 c-3.47-1.789-9.135-1.76-12.585,0.068l-33.54,17.758c-3.453,1.826-8.535,1.061-11.298-1.699l-34.232-34.234 c-2.762-2.76-3.527-7.846-1.699-11.295l17.757-33.541c1.827-3.451,1.84-9.105,0.031-12.564l-18.536-43.322 c-1.267-3.691-5.358-7.656-9.092-8.803l-51.14-15.736c-3.733-1.148-6.786-5.283-6.786-9.188v-48.416 c0-3.902,3.053-8.037,6.786-9.186l51.14-15.738c3.733-1.146,7.822-5.107,9.092-8.801l18.533-43.32 c1.812-3.461,1.797-9.117-0.031-12.566l-17.754-33.537c-1.828-3.451-1.063-8.535,1.699-11.295l34.232-34.236 c2.763-2.762,7.845-3.523,11.298-1.697l33.538,17.756c3.452,1.828,9.115,1.855,12.582,0.064l47.85-19.807 c3.714-1.207,7.691-5.244,8.842-8.979l11.151-36.242c1.147-3.73,5.28-6.783,9.187-6.783h17.107c3.905,0,7.099,3.193,7.099,7.098 V141.6c0,0,0.157,9.604-8.341,9.604c-78.316,0-141.034,67.477-141.034,146.438c0,79.143,63.021,146.455,141.581,146.455 C297.123,444.096,296.786,451.125,296.786,451.125z M289.879,214.545c5.92-0.508,6.292-6.482,6.292-10.387v-27.225 c0,0,0.157-4.613-5.145-4.613c-68.063,0-123.028,56.979-123.028,125.320c0,68.338,54.960,125.318,123.016,125.318 c6.021,0,6.012-6.633,6.012-6.633l0.178-25.205c0-3.904-0.628-10.387-7.324-10.387c0,0-75.916-5.082-75.916-83.094 C213.963,220.996,289.879,214.545,289.879,214.545z"
                        fill={colors.lime[300]}
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <Separator
                className="data-[orientation=vertical]:h-5"
                orientation="vertical"
              />
              <Select defaultValue="free">
                <SelectTrigger className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80">
                  <SelectValue placeholder="pro" />
                </SelectTrigger>
                <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8">
                  <SelectGroup>
                    <SelectLabel className="ps-2 uppercase">Planos</SelectLabel>
                    <SelectItem value="free">
                      Samsepi0l{' '}
                      <Badge className="text-[10px]" variant={'outline'}>
                        FREE
                      </Badge>
                    </SelectItem>
                    <SelectItem disabled value="pro">
                      Samsepi0l{' '}
                      <Badge
                        className="border border-lime-400 bg-lime-500/10 text-[10px] text-lime-400"
                        variant={'outline'}
                      >
                        PRO
                      </Badge>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) =>
                  setActiveSection(value as keyof typeof LINKS)
                }
                value={activeSection}
              >
                <SelectTrigger className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8">
                  <SelectGroup>
                    <SelectLabel className="ps-2 uppercase">
                      Sistema
                    </SelectLabel>
                    <SelectItem value="serviceOrder">
                      <FileText aria-hidden="true" className="size-4" />
                      <span className="truncate">Ordem de serviços</span>
                    </SelectItem>
                    <SelectItem value="inventoryControl">
                      <Box aria-hidden="true" className="size-4" />
                      <span className="truncate">Controle de estoque</span>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-1.5">
                <Search className="size-4" />
                <input
                  className="w-lg text-sm"
                  placeholder="Search customer, services, components, folder box, service orders..."
                />
              </div>
              <Separator className="min-h-5" orientation="vertical" />
              <div className="space-x-4 text-xs text-zinc-400">
                <a
                  className="hover:text-zinc-100 hover:underline"
                  href="changelogs"
                >
                  Changelog
                </a>
                <a className="hover:text-zinc-100 hover:underline" href="help">
                  Help
                </a>
                <a
                  className="hover:text-zinc-100 hover:underline"
                  href="http://localhost:3333/docs"
                >
                  Docs
                </a>
              </div>
              <Separator className="min-h-5" orientation="vertical" />
              <div className="flex size-8 items-center justify-center rounded-full border bg-zinc-900 text-xs">
                S
              </div>
            </div>
          </div>
          <nav className="flex gap-3 pt-5">
            {LINKS[activeSection].map((link, i) => (
              <Link key={`${link.path}-${i}`} to={link.path}>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <Outlet />
      </div>
    </Provider>
  )
}
