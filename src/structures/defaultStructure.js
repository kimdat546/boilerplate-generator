const structure = {
    ".vscode": {
        "settings.json": JSON.stringify(
            {
                "editor.formatOnSave": true,
                "editor.defaultFormatter": "esbenp.prettier-vscode",
            },
            null,
            2
        ),
    },
    src: {
        assets: {
            images: {},
            fonts: {},
        },
        components: {
            "theme-provider.tsx": `import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
`,
            "Sidebar.tsx": `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { APP_URL } from '@/configs/app-url.config';
import React from 'react';
import { AiOutlineLineChart as LineChart } from 'react-icons/ai';
import { IoHome as Home, IoSettings as Settings } from 'react-icons/io5';
import { LuPackage as Package, LuPackageOpen as Package2, LuUsers2 as Users2 } from 'react-icons/lu';
import { MdShoppingCartCheckout as ShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <TooltipProvider>
        <nav className='flex flex-col items-center gap-4 px-2 py-4'>
          <Link
            to='#'
            className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
          >
            <Package2 className='h-4 w-4 transition-all group-hover:scale-110' />
            <span className='sr-only'>Acme Inc</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={${"`/${APP_URL.DASHBOARD}`"}}
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Home className='h-5 w-5' />
                <span className='sr-only'>Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <ShoppingCart className='h-5 w-5' />
                <span className='sr-only'>Orders</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Orders</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={${"`/${APP_URL.DASHBOARD}/${APP_URL.PRODUCTS}`"}}
                className='flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Package className='h-5 w-5' />
                <span className='sr-only'>Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Users2 className='h-5 w-5' />
                <span className='sr-only'>Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Customers</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <LineChart className='h-5 w-5' />
                <span className='sr-only'>Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Analytics</TooltipContent>
          </Tooltip>
        </nav>
        <nav className='mt-auto flex flex-col items-center gap-4 px-2 py-4'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Settings className='h-5 w-5' />
                <span className='sr-only'>Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Settings</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
};

export default Sidebar;
`,
            "Header.tsx": `import { useTheme } from '@/components/theme-provider';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';
import { AiOutlineLineChart as LineChart } from 'react-icons/ai';
import { IoHome as Home, IoSearch as Search } from 'react-icons/io5';
import {
  LuPackage as Package,
  LuPackageOpen as Package2,
  LuPanelLeft as PanelLeft,
  LuUsers2 as Users2,
} from 'react-icons/lu';
import { MdShoppingCartCheckout as ShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { setTheme } = useTheme();

  return (
    <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button size='icon' variant='outline' className='sm:hidden'>
            <PanelLeft className='h-5 w-5' />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='sm:max-w-xs'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link
              to='#'
              className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
            >
              <Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
              <span className='sr-only'>Acme Inc</span>
            </Link>
            <Link to='#' className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
              <Home className='h-5 w-5' />
              Dashboard
            </Link>
            <Link to='#' className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
              <ShoppingCart className='h-5 w-5' />
              Orders
            </Link>
            <Link to='#' className='flex items-center gap-4 px-2.5 text-foreground'>
              <Package className='h-5 w-5' />
              Products
            </Link>
            <Link to='#' className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
              <Users2 className='h-5 w-5' />
              Customers
            </Link>
            <Link to='#' className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
              <LineChart className='h-5 w-5' />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className='hidden md:flex'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='#'>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='#'>Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>All Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='relative ml-auto flex-1 md:grow-0'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          type='search'
          placeholder='Search...'
          className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]'
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon' className='overflow-hidden rounded-full !outline-none'>
            <img
              src='https://picsum.photos/80/80?random=1'
              width={36}
              height={36}
              alt='Avatar'
              className='overflow-hidden rounded-full'
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Dark Mode</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
`,
            "index.tsx": `export {default as Header} from './Header';
export { default as Sidebar } from './Sidebar';
`,
        },
        configs: {
            "api-url.config.ts": `export const API_URL = {
  ADMIN: 'admin',
  ADMIN_MEMBER_MANAGEMENT: 'admin/user',

  USER: 'user',
  USER_PROFILE: 'user/profile',
  USER_CHANGE_PASSWORD: 'user/change-password',
  USER_CHANGE_EMAIL: 'user/change-email',
  USER_CHANGE_PHONE: 'user/change-phone',

  VERIFY_OTP: 'auth/verify-code',
  FORGOT_PASSWORD: 'auth/forgot-password',
  VERIFY_EMAIL: 'auth/verify-email',
  VERIFY_EMAIL_CODE: 'auth/verify-email/code',
  SIGNUP: 'auth/signup',
  LOGIN: 'auth/login',
  REFRESH_TOKEN: 'auth/refresh-token',
};
`,
            "app-url.config.ts": `export const APP_URL = {
  HOME: '',
  ADMIN: 'admin',
  PROFILE: 'profile',
  LOGIN: 'login',
  LOADING: 'loading',
  SIGN_UP: 'sign-up',
  FORGOT_PASSWORD: 'forgot-password',
  DASHBOARD: 'dashboard',
  MANAGE_MY_ACCOUNT: 'manage-my-account',
  ACCOUNT_SETTINGS: 'account-settings',
  PRODUCTS: 'products',
  EDIT_PRODUCT: 'edit-product',
  ALL_PRODUCTS: 'all-products',
  PLAYGROUND: 'playground',
};
`,
            "http.ts": `import { authServices } from '@/services/auth.service';
import { cookieServices } from '@/services/cookie.service';
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // timeout: 20000, // 10s
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = cookieServices.getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = ${"`Bearer ${accessToken}`"};
    }

    return config;
  },
  (error) => {
    console.log('Error', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response.data,

  (error) => {
    console.log('Error: ', error);
    if (error?.response?.status === 401) {
      handleRefreshToken();
    }
    return Promise.reject(error);
  }
);

const handleRefreshToken = async () => {
  try {
    const res = await authServices.refreshToken();
    cookieServices.setAccessToken(res.data.accessToken);
    window.location.reload();
  } catch (error) {
    cookieServices.removeUserInfo();
    cookieServices.removeAccessToken();
    window.location.href = '/login';
    console.log('Refresh token error: ', error);
  }
};
`,
            "index.ts": `export const API_URI = import.meta.env.VITE_BASE_URL;
export const STORAGE_IMAGE_URI = import.meta.env.VITE_STORAGE_URL;
`,
        },
        constants: {
            "common.ts": `// keys
export const USER_INFO: string = 'USER_INFO';
export const SYMMETRIC_KEY: string = 'SYMMETRIC_KEY';
export const ACCESS_TOKEN: string = 'ACCESS_TOKEN';

// file
export const MAX_EXCEL_FILE_SIZE = 10; // mb
export const MAX_FILE_SIZE = 5; //mb

// image
export const IMAGE_FILE_TYPE = {
  '.webp': 'image/webp',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
};
export const IMAGE_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};
export const IMAGE_FALLBACK =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjgiIGhlaWdodD0iNjgiIHZpZXdCb3g9IjAgMCA2OCA2OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTU5IDUzLjQ0NDRWMTQuNTU1NkM1OSAxMS41IDU2LjUgOSA1My40NDQ0IDlIMTQuNTU1NkMxMS41IDkgOSAxMS41IDkgMTQuNTU1NlY1My40NDQ0QzkgNTYuNSAxMS41IDU5IDE0LjU1NTYgNTlINTMuNDQ0NEM1Ni41IDU5IDU5IDU2LjUgNTkgNTMuNDQ0NFpNMjUuMzg4OSAzOS41TDMxLjIyMjIgNDYuNTI3OEwzOS44MzMzIDM1LjQ0NDRDNDAuMzg4OSAzNC43MjIyIDQxLjUgMzQuNzIyMiA0Mi4wNTU2IDM1LjQ3MjJMNTEuODA1NiA0OC40NzIyQzUyLjUgNDkuMzg4OSA1MS44MzMzIDUwLjY5NDQgNTAuNjk0NCA1MC42OTQ0SDE3LjM4ODlDMTYuMjIyMiA1MC42OTQ0IDE1LjU4MzMgNDkuMzYxMSAxNi4zMDU2IDQ4LjQ0NDRMMjMuMjIyMiAzOS41NTU2QzIzLjc1IDM4LjgzMzMgMjQuODA1NiAzOC44MDU2IDI1LjM4ODkgMzkuNVoiIGZpbGw9IiNDOUNDQ0YiLz4KPC9zdmc+Cg==';

// date
export const DATE_FORMAT = 'DD-MM-YYYY';
export const REVERSED_DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT_SLASH = 'DD/MM/YYYY';
export const DATE_FORMAT_LONG = 'MMMM DD, YYYY';
export const DATE_FORMAT_LONG_KR = 'YYYY년 MM월 DD일';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = 'DD.MM.YY HH:mm';
export const FULL_DATE_FORMAT = 'DD-MM-YYYY HH:mm:ss';
export const MONTH_YEAR_FORMAT = 'MMMM YYYY';
export const MONTH_YEAR_FORMAT_KR = 'YYYY년 MM월';

// filter and pagination
export const PAGE_SIZE = 10;

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const;

export const PERMISSION_TYPES = {
  MEMBER_MANAGEMENT: 'member_management',
  EMAIL_MANAGEMENT: 'email_management',
  NOTIFICATION_MANAGEMENT: 'notification_management',
  PRODUCT_MANAGEMENT: 'product_management',
} as const;

export const PERMISSION_ACTIONS = {
  CREATE: 'save',
  UPDATE: 'update',
  DELETE: 'delete',
  READ: 'read',
} as const;

export const PRODUCT_PROCESS_STATUSES = {
  NOT_STARTED: 'not_started',
  WAITING_FOR_APPROVAL: 'waiting_for_approval',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  AUTO_REJECTED: 'auto_reject',
  PAYING_DEPOSIT: 'paying_deposit',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLATION: 'cancellation',
};

export const USER_STATUSES = {
  NOT_VERIFIED: 'not_verified',
  ACTIVE: 'active',
  PAUSE: 'pause',
  BANNED: 'banned',
} as const;

export const DEVICE_PLATFORMS = {
  OTHER: 'other',
  WEB: 'web',
  IOS: 'ios',
  ANDROID: 'android',
} as const;



export const FILE_TYPES = {
  IMAGE: 'image',
  PDF: 'pdf',
  DOCUMENT: 'document',
} as const;



export const FILE_ACCESS_MODES = {
  PUBLIC: 'public',
  PRIVATE: 'private',
} as const;


export const AUTH_GRANT_TYPES = {
  PASSWORD: 'password',
  // APPLE: 'apple',
  // GOOGLE: 'google',
  // NAVER: 'naver',
  // FACEBOOK: 'facebook',
} as const;

export const ERROR_MESSAGES = {
  'Not implemented': 'Not implemented',
  'Document does not exist': 'Document does not exist',
  'Document already exists': 'Document already exists',
  'Failed to update document': 'Failed to update document',
  'Failed to delete document': 'Failed to delete document',
  'Role does not exist': 'Role does not exist',
  'Role already exists': 'Role already exists',
  'Notification does not exist': 'Notification does not exist',
  'Notification already exists': 'Notification already exists',
  'Search name must be string': 'Search name must be string',
  'Expiration Days number is required': 'Expiration Days number is required',
  'Search name must be between 1 and 255 characters': 'Search name must be between 1 and 255 characters',
  'User role is required': 'User role is required',
  'Password must be a string': 'Password must be a string',
  'Password must be between 8 and 20 characters': 'Password must be between 8 and 20 characters',
  'Confirm Password must be a string': 'Confirm Password must be a string',
  'Confirm Password must be between 8 and 20 characters': 'Confirm Password must be between 8 and 20 characters',
  'Password is invalid': 'Password is invalid',
  'Confirm Password is invalid': 'Confirm Password is invalid',
  'Name is required': 'Name is required',
  'Email is required': 'Email is required',
  'Password is required': 'Password is required',
  'Confirm Password is required': 'Confirm Password is required',
  'Email does not exist': 'Email does not exist',
  'Email already exists': 'Email already exists',
  'User does not exist': 'User does not exist',
  'User already exists': 'User already exists',
  'File does not exist': 'File does not exist',
  'File already exists': 'File already exists',
  'Message does not exist': 'Message does not exist',
  'You do not have permission to access this resource': 'You do not have permission to access this resource',
  'User is deactivated': 'User is deactivated',
  'User has been banned': ' User has been banned',
  'File is required': 'File is required',
  'Unable to create file': 'Unable to create file',
  'Password is not match': 'Password is not match',
  'Try other login method': 'Try other login method',
  'Documents are not correct': 'Documents are not correct',
  'Files are not correct': 'Files are not correct',
  'Invalid step': 'Invalid step',
  'Missing step': 'Missing step',
} as const;
`,
        },
        containers: {
            "LoginForm.tsx": `import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APP_URL } from '@/configs/app-url.config';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='m@example.com' required />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Password</Label>
              <Link to='#' className='ml-auto inline-block text-sm underline'>
                Forgot your password?
              </Link>
            </div>
            <Input id='password' type='password' required />
          </div>
          <Button type='button' className='w-full' onClick={() => navigate(${"`/${APP_URL.DASHBOARD}`"})}>
            Login
          </Button>
          <Button variant='outline' className='w-full'>
            Login with Google
          </Button>
        </div>
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link to={${"`/${APP_URL.SIGN_UP}`"}} className='underline'>
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
`,
            "SignUpForm.tsx": `import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { APP_URL } from '@/configs/app-url.config';

const SignUpForm: React.FC = () => {
  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-xl'>Sign Up</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='first-name'>First name</Label>
              <Input id='first-name' placeholder='Max' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='last-name'>Last name</Label>
              <Input id='last-name' placeholder='Robinson' required />
            </div>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='m@example.com' required />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' />
          </div>
          <Button type='submit' className='w-full'>
            Create an account
          </Button>
          <Button variant='outline' className='w-full'>
            Sign up with GitHub
          </Button>
        </div>
        <div className='mt-4 text-center text-sm'>
          Already have an account?{' '}
          <Link to={${"`/${APP_URL.LOGIN}`"}} className='underline'>
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
`,
        },
        hooks: {},
        layouts: {
            "DashboardLayout.tsx": `import { Header, Sidebar } from '@/components';
import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <Sidebar />
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <Header />
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
`,
            "MainLayout.tsx": `import React from 'react';
import {Outlet} from 'react-router-dom';


const MainLayout: React.FC = () => {
  return (
    <div className='relative flex min-h-screen flex-col bg-background'>
      <div className='themes-wrapper bg-background w-full h-screen flex items-center justify-center px-4'>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
`,
            "index.tsx": `export {default as MainLayout} from './MainLayout';
export { default as DashboardLayout } from './DashboardLayout';
`,
        },
        locales: {},
        middlewares: {},
        pages: {
            LoginPage: {
                "index.tsx": `import React from 'react';
import LoginForm from '@/containers/LoginForm';

export const LoginPage: React.FC = () => {
  return <LoginForm />;
};
`,
                "Loadable.tsx": `import { lazyLoad } from '@/utils';

const LoginLazyLoad = lazyLoad(
  () => import('.'),
  module => module.LoginPage,
);

export default LoginLazyLoad;
`,
            },
            SignUpPage: {
                "index.tsx": `import React from 'react';
import SignUpForm from '@/containers/SignUpForm';

export const SignUpPage: React.FC = () => {
  return <SignUpForm />;
};
`,
                "Loadable.tsx": `import { lazyLoad } from '@/utils';

const SignUpLazyLoad = lazyLoad(
  () => import('.'),
  module => module.SignUpPage,
);

export default SignUpLazyLoad;
`,
            },
            DashboardPage: {
                "index.tsx": `import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import {
    LuActivity as Activity,
    LuArrowUpRight as ArrowUpRight,
    LuCreditCard as CreditCard,
    LuDollarSign as DollarSign,
    LuUsers as Users,
} from 'react-icons/lu';
import { Link } from 'react-router-dom';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Label,
    LabelList,
    Line,
    LineChart,
    PolarAngleAxis,
    RadialBar,
    RadialBarChart,
    Rectangle,
    ReferenceLine,
    XAxis,
    YAxis,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
      <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
        <Card x-chunk='dashboard-01-chunk-0'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$45,231.89</div>
            <p className='text-xs text-muted-foreground'>+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card x-chunk='dashboard-01-chunk-1'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Subscriptions</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+2350</div>
            <p className='text-xs text-muted-foreground'>+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card x-chunk='dashboard-01-chunk-2'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Sales</CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+12,234</div>
            <p className='text-xs text-muted-foreground'>+19% from last month</p>
          </CardContent>
        </Card>
        <Card x-chunk='dashboard-01-chunk-3'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Now</CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+573</div>
            <p className='text-xs text-muted-foreground'>+201 since last hour</p>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
        <Card className='xl:col-span-2' x-chunk='dashboard-01-chunk-4'>
          <CardHeader className='flex flex-row items-center'>
            <div className='grid gap-2'>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Recent transactions from your store.</CardDescription>
            </div>
            <Button asChild size='sm' className='ml-auto gap-1'>
              <Link to='#'>
                View All
                <ArrowUpRight className='h-4 w-4' />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className='hidden xl:table-column'>Type</TableHead>
                  <TableHead className='hidden xl:table-column'>Status</TableHead>
                  <TableHead className='hidden xl:table-column'>Date</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className='font-medium'>Liam Johnson</div>
                    <div className='hidden text-sm text-muted-foreground md:inline'>liam@example.com</div>
                  </TableCell>
                  <TableCell className='hidden xl:table-column'>Sale</TableCell>
                  <TableCell className='hidden xl:table-column'>
                    <Badge className='text-xs' variant='outline'>
                      Approved
                    </Badge>
                  </TableCell>
                  <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>2023-06-23</TableCell>
                  <TableCell className='text-right'>$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className='font-medium'>Olivia Smith</div>
                    <div className='hidden text-sm text-muted-foreground md:inline'>olivia@example.com</div>
                  </TableCell>
                  <TableCell className='hidden xl:table-column'>Refund</TableCell>
                  <TableCell className='hidden xl:table-column'>
                    <Badge className='text-xs' variant='outline'>
                      Declined
                    </Badge>
                  </TableCell>
                  <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>2023-06-24</TableCell>
                  <TableCell className='text-right'>$150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className='font-medium'>Noah Williams</div>
                    <div className='hidden text-sm text-muted-foreground md:inline'>noah@example.com</div>
                  </TableCell>
                  <TableCell className='hidden xl:table-column'>Subscription</TableCell>
                  <TableCell className='hidden xl:table-column'>
                    <Badge className='text-xs' variant='outline'>
                      Approved
                    </Badge>
                  </TableCell>
                  <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>2023-06-25</TableCell>
                  <TableCell className='text-right'>$350.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className='font-medium'>Emma Brown</div>
                    <div className='hidden text-sm text-muted-foreground md:inline'>emma@example.com</div>
                  </TableCell>
                  <TableCell className='hidden xl:table-column'>Sale</TableCell>
                  <TableCell className='hidden xl:table-column'>
                    <Badge className='text-xs' variant='outline'>
                      Approved
                    </Badge>
                  </TableCell>
                  <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>2023-06-26</TableCell>
                  <TableCell className='text-right'>$450.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className='font-medium'>Liam Johnson</div>
                    <div className='hidden text-sm text-muted-foreground md:inline'>liam@example.com</div>
                  </TableCell>
                  <TableCell className='hidden xl:table-column'>Sale</TableCell>
                  <TableCell className='hidden xl:table-column'>
                    <Badge className='text-xs' variant='outline'>
                      Approved
                    </Badge>
                  </TableCell>
                  <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>2023-06-27</TableCell>
                  <TableCell className='text-right'>$550.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card x-chunk='dashboard-01-chunk-5'>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-8'>
            <div className='flex items-center gap-4'>
              <Avatar className='hidden h-9 w-9 sm:flex'>
                <AvatarImage src='/avatars/01.png' alt='Avatar' />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className='grid gap-1'>
                <p className='text-sm font-medium leading-none'>Olivia Martin</p>
                <p className='text-sm text-muted-foreground'>olivia.martin@email.com</p>
              </div>
              <div className='ml-auto font-medium'>+$1,999.00</div>
            </div>
            <div className='flex items-center gap-4'>
              <Avatar className='hidden h-9 w-9 sm:flex'>
                <AvatarImage src='/avatars/02.png' alt='Avatar' />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className='grid gap-1'>
                <p className='text-sm font-medium leading-none'>Jackson Lee</p>
                <p className='text-sm text-muted-foreground'>jackson.lee@email.com</p>
              </div>
              <div className='ml-auto font-medium'>+$39.00</div>
            </div>
            <div className='flex items-center gap-4'>
              <Avatar className='hidden h-9 w-9 sm:flex'>
                <AvatarImage src='/avatars/03.png' alt='Avatar' />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div className='grid gap-1'>
                <p className='text-sm font-medium leading-none'>Isabella Nguyen</p>
                <p className='text-sm text-muted-foreground'>isabella.nguyen@email.com</p>
              </div>
              <div className='ml-auto font-medium'>+$299.00</div>
            </div>
            <div className='flex items-center gap-4'>
              <Avatar className='hidden h-9 w-9 sm:flex'>
                <AvatarImage src='/avatars/04.png' alt='Avatar' />
                <AvatarFallback>WK</AvatarFallback>
              </Avatar>
              <div className='grid gap-1'>
                <p className='text-sm font-medium leading-none'>William Kim</p>
                <p className='text-sm text-muted-foreground'>will@email.com</p>
              </div>
              <div className='ml-auto font-medium'>+$99.00</div>
            </div>
            <div className='flex items-center gap-4'>
              <Avatar className='hidden h-9 w-9 sm:flex'>
                <AvatarImage src='/avatars/05.png' alt='Avatar' />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div className='grid gap-1'>
                <p className='text-sm font-medium leading-none'>Sofia Davis</p>
                <p className='text-sm text-muted-foreground'>sofia.davis@email.com</p>
              </div>
              <div className='ml-auto font-medium'>+$39.00</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='chart-wrapper flex w-full flex-col flex-wrap items-start justify-center gap-6 sm:flex-row'>
        <div className='grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]'>
          <Card className='lg:max-w-md' x-chunk='charts-01-chunk-0'>
            <CardHeader className='space-y-0 pb-2'>
              <CardDescription>Today</CardDescription>
              <CardTitle className='text-4xl tabular-nums'>
                12,584{' '}
                <span className='font-sans text-sm font-normal tracking-normal text-muted-foreground'>steps</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  steps: {
                    label: 'Steps',
                    color: 'hsl(var(--chart-1))',
                  },
                }}
              >
                <BarChart
                  accessibilityLayer
                  margin={{
                    left: -4,
                    right: -4,
                  }}
                  data={[
                    {
                      date: '2024-01-01',
                      steps: 2000,
                    },
                    {
                      date: '2024-01-02',
                      steps: 2100,
                    },
                    {
                      date: '2024-01-03',
                      steps: 2200,
                    },
                    {
                      date: '2024-01-04',
                      steps: 1300,
                    },
                    {
                      date: '2024-01-05',
                      steps: 1400,
                    },
                    {
                      date: '2024-01-06',
                      steps: 2500,
                    },
                    {
                      date: '2024-01-07',
                      steps: 1600,
                    },
                  ]}
                >
                  <Bar
                    dataKey='steps'
                    fill='var(--color-steps)'
                    radius={5}
                    fillOpacity={0.6}
                    activeBar={<Rectangle fillOpacity={0.8} />}
                  />
                  <XAxis
                    dataKey='date'
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    tickFormatter={value => {
                      return new Date(value).toLocaleDateString('en-US', {
                        weekday: 'short',
                      });
                    }}
                  />
                  <ChartTooltip
                    defaultIndex={2}
                    content={
                      <ChartTooltipContent
                        hideIndicator
                        labelFormatter={value => {
                          return new Date(value).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          });
                        }}
                      />
                    }
                    cursor={false}
                  />
                  <ReferenceLine y={1200} stroke='hsl(var(--muted-foreground))' strokeDasharray='3 3' strokeWidth={1}>
                    <Label
                      position='insideBottomLeft'
                      value='Average Steps'
                      offset={10}
                      fill='hsl(var(--foreground))'
                    />
                    <Label
                      position='insideTopLeft'
                      value='12,343'
                      className='text-lg'
                      fill='hsl(var(--foreground))'
                      offset={10}
                      startOffset={100}
                    />
                  </ReferenceLine>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className='flex-col items-start gap-1'>
              <CardDescription>
                Over the past 7 days, you have walked <span className='font-medium text-foreground'>53,305</span> steps.
              </CardDescription>
              <CardDescription>
                You need <span className='font-medium text-foreground'>12,584</span> more steps to reach your goal.
              </CardDescription>
            </CardFooter>
          </Card>
          <Card className='flex flex-col lg:max-w-md' x-chunk='charts-01-chunk-1'>
            <CardHeader className='flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1'>
              <div>
                <CardDescription>Resting HR</CardDescription>
                <CardTitle className='flex items-baseline gap-1 text-4xl tabular-nums'>
                  62
                  <span className='text-sm font-normal tracking-normal text-muted-foreground'>bpm</span>
                </CardTitle>
              </div>
              <div>
                <CardDescription>Variability</CardDescription>
                <CardTitle className='flex items-baseline gap-1 text-4xl tabular-nums'>
                  35
                  <span className='text-sm font-normal tracking-normal text-muted-foreground'>ms</span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className='flex flex-1 items-center'>
              <ChartContainer
                config={{
                  resting: {
                    label: 'Resting',
                    color: 'hsl(var(--chart-1))',
                  },
                }}
                className='w-full'
              >
                <LineChart
                  accessibilityLayer
                  margin={{
                    left: 14,
                    right: 14,
                    top: 10,
                  }}
                  data={[
                    {
                      date: '2024-01-01',
                      resting: 62,
                    },
                    {
                      date: '2024-01-02',
                      resting: 72,
                    },
                    {
                      date: '2024-01-03',
                      resting: 35,
                    },
                    {
                      date: '2024-01-04',
                      resting: 62,
                    },
                    {
                      date: '2024-01-05',
                      resting: 52,
                    },
                    {
                      date: '2024-01-06',
                      resting: 62,
                    },
                    {
                      date: '2024-01-07',
                      resting: 70,
                    },
                  ]}
                >
                  <CartesianGrid
                    strokeDasharray='4 4'
                    vertical={false}
                    stroke='hsl(var(--muted-foreground))'
                    strokeOpacity={0.5}
                  />
                  <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                  <XAxis
                    dataKey='date'
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={value => {
                      return new Date(value).toLocaleDateString('en-US', {
                        weekday: 'short',
                      });
                    }}
                  />
                  <Line
                    dataKey='resting'
                    type='natural'
                    fill='var(--color-resting)'
                    stroke='var(--color-resting)'
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                      fill: 'var(--color-resting)',
                      stroke: 'var(--color-resting)',
                      r: 4,
                    }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        indicator='line'
                        labelFormatter={value => {
                          return new Date(value).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          });
                        }}
                      />
                    }
                    cursor={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <div className='grid w-full flex-1 gap-6 lg:max-w-[20rem]'>
          <Card className='max-w-xs' x-chunk='charts-01-chunk-2'>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
              <CardDescription>You're average more steps a day this year than last year.</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <div className='grid auto-rows-min gap-2'>
                <div className='flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none'>
                  12,453
                  <span className='text-sm font-normal text-muted-foreground'>steps/day</span>
                </div>
                <ChartContainer
                  config={{
                    steps: {
                      label: 'Steps',
                      color: 'hsl(var(--chart-1))',
                    },
                  }}
                  className='aspect-auto h-[32px] w-full'
                >
                  <BarChart
                    accessibilityLayer
                    layout='vertical'
                    margin={{
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                    }}
                    data={[
                      {
                        date: '2024',
                        steps: 12435,
                      },
                    ]}
                  >
                    <Bar dataKey='steps' fill='var(--color-steps)' radius={4} barSize={32}>
                      <LabelList position='insideLeft' dataKey='date' offset={8} fontSize={12} fill='white' />
                    </Bar>
                    <YAxis dataKey='date' type='category' tickCount={1} hide />
                    <XAxis dataKey='steps' type='number' hide />
                  </BarChart>
                </ChartContainer>
              </div>
              <div className='grid auto-rows-min gap-2'>
                <div className='flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none'>
                  10,103
                  <span className='text-sm font-normal text-muted-foreground'>steps/day</span>
                </div>
                <ChartContainer
                  config={{
                    steps: {
                      label: 'Steps',
                      color: 'hsl(var(--muted))',
                    },
                  }}
                  className='aspect-auto h-[32px] w-full'
                >
                  <BarChart
                    accessibilityLayer
                    layout='vertical'
                    margin={{
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                    }}
                    data={[
                      {
                        date: '2023',
                        steps: 10103,
                      },
                    ]}
                  >
                    <Bar dataKey='steps' fill='var(--color-steps)' radius={4} barSize={32}>
                      <LabelList
                        position='insideLeft'
                        dataKey='date'
                        offset={8}
                        fontSize={12}
                        fill='hsl(var(--muted-foreground))'
                      />
                    </Bar>
                    <YAxis dataKey='date' type='category' tickCount={1} hide />
                    <XAxis dataKey='steps' type='number' hide />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          <Card className='max-w-xs' x-chunk='charts-01-chunk-3'>
            <CardHeader className='p-4 pb-0'>
              <CardTitle>Walking Distance</CardTitle>
              <CardDescription>
                Over the last 7 days, your distance walked and run was 12.5 miles per day.
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-row items-baseline gap-4 p-4 pt-0'>
              <div className='flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none'>
                12.5
                <span className='text-sm font-normal text-muted-foreground'>miles/day</span>
              </div>
              <ChartContainer
                config={{
                  steps: {
                    label: 'Steps',
                    color: 'hsl(var(--chart-1))',
                  },
                }}
                className='ml-auto w-[72px]'
              >
                <BarChart
                  accessibilityLayer
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      date: '2024-01-01',
                      steps: 2000,
                    },
                    {
                      date: '2024-01-02',
                      steps: 2100,
                    },
                    {
                      date: '2024-01-03',
                      steps: 2200,
                    },
                    {
                      date: '2024-01-04',
                      steps: 1300,
                    },
                    {
                      date: '2024-01-05',
                      steps: 1400,
                    },
                    {
                      date: '2024-01-06',
                      steps: 2500,
                    },
                    {
                      date: '2024-01-07',
                      steps: 1600,
                    },
                  ]}
                >
                  <Bar
                    dataKey='steps'
                    fill='var(--color-steps)'
                    radius={2}
                    fillOpacity={0.2}
                    activeIndex={6}
                    activeBar={<Rectangle fillOpacity={0.8} />}
                  />
                  <XAxis dataKey='date' tickLine={false} axisLine={false} tickMargin={4} hide />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className='max-w-xs' x-chunk='charts-01-chunk-4'>
            <CardContent className='flex gap-4 p-4 pb-2'>
              <ChartContainer
                config={{
                  move: {
                    label: 'Move',
                    color: 'hsl(var(--chart-1))',
                  },
                  stand: {
                    label: 'Stand',
                    color: 'hsl(var(--chart-2))',
                  },
                  exercise: {
                    label: 'Exercise',
                    color: 'hsl(var(--chart-3))',
                  },
                }}
                className='h-[140px] w-full'
              >
                <BarChart
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 10,
                  }}
                  data={[
                    {
                      activity: 'stand',
                      value: (8 / 12) * 100,
                      label: '8/12 hr',
                      fill: 'var(--color-stand)',
                    },
                    {
                      activity: 'exercise',
                      value: (46 / 60) * 100,
                      label: '46/60 min',
                      fill: 'var(--color-exercise)',
                    },
                    {
                      activity: 'move',
                      value: (245 / 360) * 100,
                      label: '245/360 kcal',
                      fill: 'var(--color-move)',
                    },
                  ]}
                  layout='vertical'
                  barSize={32}
                  barGap={2}
                >
                  <XAxis type='number' dataKey='value' hide />
                  <YAxis
                    dataKey='activity'
                    type='category'
                    tickLine={false}
                    tickMargin={4}
                    axisLine={false}
                    className='capitalize'
                  />
                  <Bar dataKey='value' radius={5}>
                    <LabelList position='insideLeft' dataKey='label' fill='white' offset={8} fontSize={12} />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className='flex flex-row border-t p-4'>
              <div className='flex w-full items-center gap-2'>
                <div className='grid flex-1 auto-rows-min gap-0.5'>
                  <div className='text-xs text-muted-foreground'>Move</div>
                  <div className='flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none'>
                    562
                    <span className='text-sm font-normal text-muted-foreground'>kcal</span>
                  </div>
                </div>
                <Separator orientation='vertical' className='mx-2 h-10 w-px' />
                <div className='grid flex-1 auto-rows-min gap-0.5'>
                  <div className='text-xs text-muted-foreground'>Exercise</div>
                  <div className='flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none'>
                    73
                    <span className='text-sm font-normal text-muted-foreground'>min</span>
                  </div>
                </div>
                <Separator orientation='vertical' className='mx-2 h-10 w-px' />
                <div className='grid flex-1 auto-rows-min gap-0.5'>
                  <div className='text-xs text-muted-foreground'>Stand</div>
                  <div className='flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none'>
                    14
                    <span className='text-sm font-normal text-muted-foreground'>hr</span>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className='grid w-full flex-1 gap-6'>
          <Card className='max-w-xs' x-chunk='charts-01-chunk-5'>
            <CardContent className='flex gap-4 p-4'>
              <div className='grid items-center gap-2'>
                <div className='grid flex-1 auto-rows-min gap-0.5'>
                  <div className='text-sm text-muted-foreground'>Move</div>
                  <div className='flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none'>
                    562/600
                    <span className='text-sm font-normal text-muted-foreground'>kcal</span>
                  </div>
                </div>
                <div className='grid flex-1 auto-rows-min gap-0.5'>
                  <div className='text-sm text-muted-foreground'>Exercise</div>
                  <div className='flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none'>
                    73/120
                    <span className='text-sm font-normal text-muted-foreground'>min</span>
                  </div>
                </div>
                <div className='grid flex-1 auto-rows-min gap-0.5'>
                  <div className='text-sm text-muted-foreground'>Stand</div>
                  <div className='flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none'>
                    8/12
                    <span className='text-sm font-normal text-muted-foreground'>hr</span>
                  </div>
                </div>
              </div>
              <ChartContainer
                config={{
                  move: {
                    label: 'Move',
                    color: 'hsl(var(--chart-1))',
                  },
                  exercise: {
                    label: 'Exercise',
                    color: 'hsl(var(--chart-2))',
                  },
                  stand: {
                    label: 'Stand',
                    color: 'hsl(var(--chart-3))',
                  },
                }}
                className='mx-auto aspect-square w-full max-w-[80%]'
              >
                <RadialBarChart
                  margin={{
                    left: -10,
                    right: -10,
                    top: -10,
                    bottom: -10,
                  }}
                  data={[
                    {
                      activity: 'stand',
                      value: (8 / 12) * 100,
                      fill: 'var(--color-stand)',
                    },
                    {
                      activity: 'exercise',
                      value: (46 / 60) * 100,
                      fill: 'var(--color-exercise)',
                    },
                    {
                      activity: 'move',
                      value: (245 / 360) * 100,
                      fill: 'var(--color-move)',
                    },
                  ]}
                  innerRadius='20%'
                  barSize={24}
                  startAngle={90}
                  endAngle={450}
                >
                  <PolarAngleAxis type='number' domain={[0, 100]} dataKey='value' tick={false} />
                  <RadialBar dataKey='value' background cornerRadius={5} />
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className='max-w-xs' x-chunk='charts-01-chunk-6'>
            <CardHeader className='p-4 pb-0'>
              <CardTitle>Active Energy</CardTitle>
              <CardDescription>You're burning an average of 754 calories per day. Good job!</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-row items-baseline gap-4 p-4 pt-2'>
              <div className='flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none'>
                1,254
                <span className='text-sm font-normal text-muted-foreground'>kcal/day</span>
              </div>
              <ChartContainer
                config={{
                  calories: {
                    label: 'Calories',
                    color: 'hsl(var(--chart-1))',
                  },
                }}
                className='ml-auto w-[64px]'
              >
                <BarChart
                  accessibilityLayer
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      date: '2024-01-01',
                      calories: 354,
                    },
                    {
                      date: '2024-01-02',
                      calories: 514,
                    },
                    {
                      date: '2024-01-03',
                      calories: 345,
                    },
                    {
                      date: '2024-01-04',
                      calories: 734,
                    },
                    {
                      date: '2024-01-05',
                      calories: 645,
                    },
                    {
                      date: '2024-01-06',
                      calories: 456,
                    },
                    {
                      date: '2024-01-07',
                      calories: 345,
                    },
                  ]}
                >
                  <Bar
                    dataKey='calories'
                    fill='var(--color-calories)'
                    radius={2}
                    fillOpacity={0.2}
                    activeIndex={6}
                    activeBar={<Rectangle fillOpacity={0.8} />}
                  />
                  <XAxis dataKey='date' tickLine={false} axisLine={false} tickMargin={4} hide />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className='max-w-xs' x-chunk='charts-01-chunk-7'>
            <CardHeader className='space-y-0 pb-0'>
              <CardDescription>Time in Bed</CardDescription>
              <CardTitle className='flex items-baseline gap-1 text-4xl tabular-nums'>
                8<span className='font-sans text-sm font-normal tracking-normal text-muted-foreground'>hr</span>
                35
                <span className='font-sans text-sm font-normal tracking-normal text-muted-foreground'>min</span>
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              <ChartContainer
                config={{
                  time: {
                    label: 'Time',
                    color: 'hsl(var(--chart-2))',
                  },
                }}
              >
                <AreaChart
                  accessibilityLayer
                  data={[
                    {
                      date: '2024-01-01',
                      time: 8.5,
                    },
                    {
                      date: '2024-01-02',
                      time: 7.2,
                    },
                    {
                      date: '2024-01-03',
                      time: 8.1,
                    },
                    {
                      date: '2024-01-04',
                      time: 6.2,
                    },
                    {
                      date: '2024-01-05',
                      time: 5.2,
                    },
                    {
                      date: '2024-01-06',
                      time: 8.1,
                    },
                    {
                      date: '2024-01-07',
                      time: 7.0,
                    },
                  ]}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey='date' hide />
                  <YAxis domain={['dataMin - 5', 'dataMax + 2']} hide />
                  <defs>
                    <linearGradient id='fillTime' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='var(--color-time)' stopOpacity={0.8} />
                      <stop offset='95%' stopColor='var(--color-time)' stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey='time'
                    type='natural'
                    fill='url(#fillTime)'
                    fillOpacity={0.4}
                    stroke='var(--color-time)'
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    formatter={value => (
                      <div className='flex min-w-[120px] items-center text-xs text-muted-foreground'>
                        Time in bed
                        <div className='ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground'>
                          {value}
                          <span className='font-normal text-muted-foreground'>hr</span>
                        </div>
                      </div>
                    )}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
`,
                "Loadable.tsx": `import { lazyLoad } from '@/utils';

const DashboardLazyLoad = lazyLoad(
  () => import('.'),
  module => module.DashboardPage,
);

export default DashboardLazyLoad;
`,
            },
            products: {
                EditProductPage: {
                    "index.tsx": `import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import { AiFillPlusCircle as PlusCircle } from 'react-icons/ai';
import { HiOutlineChevronLeft as ChevronLeft } from 'react-icons/hi';
import { LuUpload as Upload } from 'react-icons/lu';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';


export const EditProductPage: React.FC = () => {
  return (
    <div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon' className='h-7 w-7'>
          <ChevronLeft className='h-4 w-4' />
          <span className='sr-only'>Back</span>
        </Button>
        <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
          Pro Controller
        </h1>
        <Badge variant='outline' className='ml-auto sm:ml-0'>
          In stock
        </Badge>
        <div className='hidden items-center gap-2 md:ml-auto md:flex'>
          <Button variant='outline' size='sm'>
            Discard
          </Button>
          <Button size='sm'>Save Product</Button>
        </div>
      </div>
      <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
        <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
          <Card x-chunk='dashboard-07-chunk-0'>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-6'>
                <div className='grid gap-3'>
                  <Label htmlFor='name'>Name</Label>
                  <Input id='name' type='text' className='w-full' defaultValue='Gamer Gear Pro Controller' />
                </div>
                <div className='grid gap-3'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    id='description'
                    defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc.'
                    className='min-h-32'
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-07-chunk-1'>
            <CardHeader>
              <CardTitle>Stock</CardTitle>
              <CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'>SKU</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className='w-[100px]'>Size</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-semibold'>GGPC-001</TableCell>
                    <TableCell>
                      <Label htmlFor='stock-1' className='sr-only'>
                        Stock
                      </Label>
                      <Input id='stock-1' type='number' defaultValue='100' />
                    </TableCell>
                    <TableCell>
                      <Label htmlFor='price-1' className='sr-only'>
                        Price
                      </Label>
                      <Input id='price-1' type='number' defaultValue='99.99' />
                    </TableCell>
                    <TableCell>
                      <ToggleGroup type='single' defaultValue='s' variant='outline'>
                        <ToggleGroupItem value='s'>S</ToggleGroupItem>
                        <ToggleGroupItem value='m'>M</ToggleGroupItem>
                        <ToggleGroupItem value='l'>L</ToggleGroupItem>
                      </ToggleGroup>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-semibold'>GGPC-002</TableCell>
                    <TableCell>
                      <Label htmlFor='stock-2' className='sr-only'>
                        Stock
                      </Label>
                      <Input id='stock-2' type='number' defaultValue='143' />
                    </TableCell>
                    <TableCell>
                      <Label htmlFor='price-2' className='sr-only'>
                        Price
                      </Label>
                      <Input id='price-2' type='number' defaultValue='99.99' />
                    </TableCell>
                    <TableCell>
                      <ToggleGroup type='single' defaultValue='m' variant='outline'>
                        <ToggleGroupItem value='s'>S</ToggleGroupItem>
                        <ToggleGroupItem value='m'>M</ToggleGroupItem>
                        <ToggleGroupItem value='l'>L</ToggleGroupItem>
                      </ToggleGroup>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-semibold'>GGPC-003</TableCell>
                    <TableCell>
                      <Label htmlFor='stock-3' className='sr-only'>
                        Stock
                      </Label>
                      <Input id='stock-3' type='number' defaultValue='32' />
                    </TableCell>
                    <TableCell>
                      <Label htmlFor='price-3' className='sr-only'>
                        Stock
                      </Label>
                      <Input id='price-3' type='number' defaultValue='99.99' />
                    </TableCell>
                    <TableCell>
                      <ToggleGroup type='single' defaultValue='s' variant='outline'>
                        <ToggleGroupItem value='s'>S</ToggleGroupItem>
                        <ToggleGroupItem value='m'>M</ToggleGroupItem>
                        <ToggleGroupItem value='l'>L</ToggleGroupItem>
                      </ToggleGroup>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className='justify-center border-t p-4'>
              <Button size='sm' variant='ghost' className='gap-1'>
                <PlusCircle className='h-3.5 w-3.5' />
                Add Variant
              </Button>
            </CardFooter>
          </Card>
          <Card x-chunk='dashboard-07-chunk-2'>
            <CardHeader>
              <CardTitle>Product Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid gap-6 sm:grid-cols-3'>
                <div className='grid gap-3'>
                  <Label htmlFor='category'>Category</Label>
                  <Select>
                    <SelectTrigger id='category' aria-label='Select category'>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='clothing'>Clothing</SelectItem>
                      <SelectItem value='electronics'>Electronics</SelectItem>
                      <SelectItem value='accessories'>Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid gap-3'>
                  <Label htmlFor='subcategory'>Subcategory (optional)</Label>
                  <Select>
                    <SelectTrigger id='subcategory' aria-label='Select subcategory'>
                      <SelectValue placeholder='Select subcategory' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='t-shirts'>T-Shirts</SelectItem>
                      <SelectItem value='hoodies'>Hoodies</SelectItem>
                      <SelectItem value='sweatshirts'>Sweatshirts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
          <Card x-chunk='dashboard-07-chunk-3'>
            <CardHeader>
              <CardTitle>Product Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid gap-6'>
                <div className='grid gap-3'>
                  <Label htmlFor='status'>Status</Label>
                  <Select>
                    <SelectTrigger id='status' aria-label='Select status'>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='draft'>Draft</SelectItem>
                      <SelectItem value='published'>Active</SelectItem>
                      <SelectItem value='archived'>Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className='overflow-hidden' x-chunk='dashboard-07-chunk-4'>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-2'>
                <img
                  alt='Product image'
                  className='aspect-square w-full rounded-md object-cover'
                  height='300'
                  src='https://picsum.photos/300/300?random=1'
                  width='300'
                />
                <div className='grid grid-cols-3 gap-2'>
                  <button>
                    <img
                      alt='Product image'
                      className='aspect-square w-full rounded-md object-cover'
                      height='84'
                      src='https://picsum.photos/80/80?random=1'
                      width='84'
                    />
                  </button>
                  <button>
                    <img
                      alt='Product image'
                      className='aspect-square w-full rounded-md object-cover'
                      height='84'
                      src='https://picsum.photos/80/80?random=2'
                      width='84'
                    />
                  </button>
                  <button className='flex aspect-square w-full items-center justify-center rounded-md border border-dashed'>
                    <Upload className='h-4 w-4 text-muted-foreground' />
                    <span className='sr-only'>Upload</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-07-chunk-5'>
            <CardHeader>
              <CardTitle>Archive Product</CardTitle>
              <CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit.</CardDescription>
            </CardHeader>
            <CardContent>
              <div></div>
              <Button size='sm' variant='secondary'>
                Archive Product
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className='flex items-center justify-center gap-2 md:hidden'>
        <Button variant='outline' size='sm'>
          Discard
        </Button>
        <Button size='sm'>Save Product</Button>
      </div>
    </div>
  );
};
`,
                    "Loadable.tsx": `import { lazyLoad } from '@/utils';

const EditProductLazyLoad = lazyLoad(
  () => import('.'),
  module => module.EditProductPage,
);

export default EditProductLazyLoad;
`,
                },
                ProductPage: {
                    "index.tsx": `import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import { AiFillPlusCircle as PlusCircle } from 'react-icons/ai';
import { FaFileAlt as File } from 'react-icons/fa';
import { LuListFilter as ListFilter, LuMoreHorizontal as MoreHorizontal } from 'react-icons/lu';
import { APP_URL } from '@/configs/app-url.config';
import { useNavigate } from 'react-router-dom';

export const ProductPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Tabs defaultValue='all'>
      <div className='flex items-center'>
        <TabsList>
          <TabsTrigger value='all'>All</TabsTrigger>
          <TabsTrigger value='active'>Active</TabsTrigger>
          <TabsTrigger value='draft'>Draft</TabsTrigger>
          <TabsTrigger value='archived' className='hidden sm:flex'>
            Archived
          </TabsTrigger>
        </TabsList>
        <div className='ml-auto flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-7 gap-1'>
                <ListFilter className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size='sm' variant='outline' className='h-7 gap-1'>
            <File className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Export</span>
          </Button>
          <Button size='sm' className='h-7 gap-1'>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Add Product</span>
          </Button>
        </div>
      </div>
      <TabsContent value='all'>
        <Card x-chunk='dashboard-06-chunk-0'>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your products and view their sales performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='hidden w-[100px] sm:table-cell'>
                    <span className='sr-only'>Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className='hidden md:table-cell'>Total Sales</TableHead>
                  <TableHead className='hidden md:table-cell'>Created at</TableHead>
                  <TableHead>
                    <span className='sr-only'>Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className='hidden sm:table-cell'>
                    <img
                      alt='Product image'
                      className='aspect-square rounded-md object-cover'
                      height='64'
                      src='https://picsum.photos/300/300?random=2'
                      width='64'
                    />
                  </TableCell>
                  <TableCell className='font-medium'>Laser Lemonade Machine</TableCell>
                  <TableCell>
                    <Badge variant='outline'>Draft</Badge>
                  </TableCell>
                  <TableCell>$499.99</TableCell>
                  <TableCell className='hidden md:table-cell'>25</TableCell>
                  <TableCell className='hidden md:table-cell'>2023-07-12 10:42 AM</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup='true' size='icon' variant='ghost'>
                          <MoreHorizontal className='h-4 w-4' />
                          <span className='sr-only'>Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            navigate(${"`${APP_URL.EDIT_PRODUCT}`"});
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='hidden sm:table-cell'>
                    <img
                      alt='Product image'
                      className='aspect-square rounded-md object-cover'
                      height='64'
                      src='https://picsum.photos/300/300?random=3'
                      width='64'
                    />
                  </TableCell>
                  <TableCell className='font-medium'>Hypernova Headphones</TableCell>
                  <TableCell>
                    <Badge variant='outline'>Active</Badge>
                  </TableCell>
                  <TableCell>$129.99</TableCell>
                  <TableCell className='hidden md:table-cell'>100</TableCell>
                  <TableCell className='hidden md:table-cell'>2023-10-18 03:21 PM</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup='true' size='icon' variant='ghost'>
                          <MoreHorizontal className='h-4 w-4' />
                          <span className='sr-only'>Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            navigate(${"`${APP_URL.EDIT_PRODUCT}`"});
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='hidden sm:table-cell'>
                    <img
                      alt='Product image'
                      className='aspect-square rounded-md object-cover'
                      height='64'
                      src='https://picsum.photos/300/300?random=4'
                      width='64'
                    />
                  </TableCell>
                  <TableCell className='font-medium'>AeroGlow Desk Lamp</TableCell>
                  <TableCell>
                    <Badge variant='outline'>Active</Badge>
                  </TableCell>
                  <TableCell>$39.99</TableCell>
                  <TableCell className='hidden md:table-cell'>50</TableCell>
                  <TableCell className='hidden md:table-cell'>2023-11-29 08:15 AM</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup='true' size='icon' variant='ghost'>
                          <MoreHorizontal className='h-4 w-4' />
                          <span className='sr-only'>Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            navigate(${"`${APP_URL.EDIT_PRODUCT}`"});
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='hidden sm:table-cell'>
                    <img
                      alt='Product image'
                      className='aspect-square rounded-md object-cover'
                      height='64'
                      src='https://picsum.photos/300/300?random=5'
                      width='64'
                    />
                  </TableCell>
                  <TableCell className='font-medium'>TechTonic Energy Drink</TableCell>
                  <TableCell>
                    <Badge variant='secondary'>Draft</Badge>
                  </TableCell>
                  <TableCell>$2.99</TableCell>
                  <TableCell className='hidden md:table-cell'>0</TableCell>
                  <TableCell className='hidden md:table-cell'>2023-12-25 11:59 PM</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup='true' size='icon' variant='ghost'>
                          <MoreHorizontal className='h-4 w-4' />
                          <span className='sr-only'>Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            navigate(${"`${APP_URL.EDIT_PRODUCT}`"});
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='hidden sm:table-cell'>
                    <img
                      alt='Product image'
                      className='aspect-square rounded-md object-cover'
                      height='64'
                      src='https://picsum.photos/300/300?random=6'
                      width='64'
                    />
                  </TableCell>
                  <TableCell className='font-medium'>Gamer Gear Pro Controller</TableCell>
                  <TableCell>
                    <Badge variant='outline'>Active</Badge>
                  </TableCell>
                  <TableCell>$59.99</TableCell>
                  <TableCell className='hidden md:table-cell'>75</TableCell>
                  <TableCell className='hidden md:table-cell'>2024-01-01 12:00 AM</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup='true' size='icon' variant='ghost'>
                          <MoreHorizontal className='h-4 w-4' />
                          <span className='sr-only'>Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            navigate(${"`${APP_URL.EDIT_PRODUCT}`"});
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='hidden sm:table-cell'>
                    <img
                      alt='Product image'
                      className='aspect-square rounded-md object-cover'
                      height='64'
                      src='https://picsum.photos/300/300?random=1'
                      width='64'
                    />
                  </TableCell>
                  <TableCell className='font-medium'>Luminous VR Headset</TableCell>
                  <TableCell>
                    <Badge variant='outline'>Active</Badge>
                  </TableCell>
                  <TableCell>$199.99</TableCell>
                  <TableCell className='hidden md:table-cell'>30</TableCell>
                  <TableCell className='hidden md:table-cell'>2024-02-14 02:14 PM</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup='true' size='icon' variant='ghost'>
                          <MoreHorizontal className='h-4 w-4' />
                          <span className='sr-only'>Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            navigate(${"`${APP_URL.EDIT_PRODUCT}`"});
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className='text-xs text-muted-foreground'>
              Showing <strong>1-10</strong> of <strong>32</strong> products
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
`,
                    "Loadable.tsx": `import { lazyLoad } from '@/utils';

const ProductLazyLoad = lazyLoad(
  () => import('.'),
  module => module.ProductPage,
);

export default ProductLazyLoad;
`,
                },
            },
        },
        router: {
            "index.tsx": `import { APP_URL } from '@/configs/app-url.config';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Layouts
import { DashboardLayout, MainLayout } from '@/layouts';

// Elements
import DashboardPageLazyLoad from '@/pages/DashboardPage/Loadable';
import LoginPageLazyLoad from '@/pages/LoginPage/Loadable';
import EditProductPageLazyLoad from '@/pages/products/EditProductPage/Loadable';
import ProductPageLazyLoad from '@/pages/products/ProductPage/Loadable';
import SignUpPageLazyLoad from '@/pages/SignUpPage/Loadable';

const router = createBrowserRouter([
  // Public routes
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to={${"`/${APP_URL.LOGIN}`"}} />,
      },
      {
        path: ${"`/${APP_URL.LOGIN}`"},
        element: <LoginPageLazyLoad />,
      },
      {
        path: ${"`/${APP_URL.SIGN_UP}`"},
        element: <SignUpPageLazyLoad />,
      },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: ${"`/${APP_URL.DASHBOARD}`"},
        element: <DashboardPageLazyLoad />,
      },
      {
        path: ${"`/${APP_URL.DASHBOARD}/${APP_URL.PRODUCTS}`"},
        element: <ProductPageLazyLoad />,
      },
      {
        path: ${"`/${APP_URL.DASHBOARD}/${APP_URL.PRODUCTS}/${APP_URL.EDIT_PRODUCT}`"},
        element: <EditProductPageLazyLoad />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/home',
        element: <></>,
      },
    ],
  },
]);

export default router;
`,
            "PrivateRoute.tsx": `import { Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  return <Outlet />;
};

export default PrivateRoute;`,
        },
        services: {
            "auth.service.ts": `import { API_URL } from '@/configs/api-url.config';
import { api } from '@/configs/http';
import { Login, Signup, VerifyOtpPayload } from '@/types/api-request.type';
import appendFromData from '@/utils/appendFromData';

export const authServices = {
  register(data: Signup) {
    const postData = appendFromData(data);
    return api.post(API_URL.SIGNUP, postData);
  },
  login(data: Login) {
    return api.post(API_URL.LOGIN, data);
  },
  verifyOtp(data: VerifyOtpPayload) {
    return api.post(API_URL.VERIFY_OTP, data);
  },
  forgotPassword(data: { email: string }) {
    return api.post(API_URL.FORGOT_PASSWORD, data);
  },
  updateForgotPassword(data: { resetToken: string; newPassword: string; confirmPassword: string }) {
    return api.post(${"`${API_URL.FORGOT_PASSWORD}/${data.resetToken}`"}, {
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
  },
  refreshToken() {
    return api.post(API_URL.REFRESH_TOKEN);
  },
  verifyEmail(data: { email: string }) {
    return api.post(API_URL.VERIFY_EMAIL, data);
  },
  verifyEmailCode(data: { email: string; code: string }) {
    return api.post(API_URL.VERIFY_EMAIL_CODE, data);
  },
};
`,
            "cookie.service.ts": `import { ACCESS_TOKEN, SYMMETRIC_KEY, USER_INFO } from '@/constants/common';
import { User } from '@/types';
import Cookies from 'js-cookie';

export const cookieServices = {
  setUserInfo: (data: User) => {
    const json = JSON.stringify(data);
    Cookies.set(USER_INFO, json, { sameSite: 'none', secure: true });
  },
  getUserInfo: () => {
    if (Cookies.get(USER_INFO)) {
      const json = Cookies.get(USER_INFO);
      if (json) {
        return JSON.parse(json) as User;
      }
      return null;
    }
    return null;
  },
  removeUserInfo: () => {
    Cookies.remove(USER_INFO);
  },
  setSymmetricKey: (data: string) => {
    const json = JSON.stringify(data);
    Cookies.set(SYMMETRIC_KEY, json, { sameSite: 'none', secure: true });
  },
  getSymmetricKey: () => {
    if (Cookies.get(SYMMETRIC_KEY)) {
      const json = Cookies.get(SYMMETRIC_KEY);
      if (json) {
        return JSON.parse(json) as string;
      }
      return null;
    }
    return null;
  },
  setAccessToken: (data: string) => {
    const json = JSON.stringify(data);
    Cookies.set(ACCESS_TOKEN, json, { sameSite: 'none', secure: true });
  },
  getAccessToken: () => {
    if (Cookies.get(ACCESS_TOKEN)) {
      const json = Cookies.get(ACCESS_TOKEN);
      if (json) {
        return JSON.parse(json) as string;
      }
      return null;
    }
    return null;
  },
  removeAccessToken: () => {
    Cookies.remove(ACCESS_TOKEN);
  },
};
`,
        },
        types: {
            "api-request.type.ts": `export type Signup = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleId?: string;
};

export type Login = {
  email: string;
  password: string;
};

export type PagePagination = Partial<{
  page: number | string;
  pageSize: number | string;
}>;

type FindMany<T> = PagePagination & T;

export type FindManyItemQuery = FindMany<{
  categoryId?: string | undefined;
  title?: string;
}>;

export type VerifyOtpPayload = {
  email: string;
  code: string | number;
};

export type PagePaginationRequest = {
  page: number | string;
  pageSize: number | string;
  searchText?: string;
  startDate?: string;
  endDate?: string;
};
`,
            "api.response.type.ts": `export type CommonApiGetPageResponse<T> = {
  item: T;
  totalCount?: number;
  searchText?: string;
};

export type CommonResponse<TData> = {
  statusCode: number;
  message: string;
  data: TData;
};
`,
            "common.type.ts": `import {
  USER_ROLES,
  ERROR_MESSAGES,
  PERMISSION_TYPES,
  PERMISSION_ACTIONS,
  PRODUCT_PROCESS_STATUSES,
  USER_STATUSES,
  DEVICE_PLATFORMS,
  FILE_TYPES,
  FILE_ACCESS_MODES,
  AUTH_GRANT_TYPES,
} from '@/constants/common';
import { User } from './entity.type';

export type ValueOf<T> = T[keyof T];

export type ErrorMessage = (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];

export type PermissionType = ValueOf<typeof PERMISSION_TYPES>;

export type PermissionAction = ValueOf<typeof PERMISSION_ACTIONS>;

export type ProductProcessStatus = ValueOf<typeof PRODUCT_PROCESS_STATUSES>;

export type Role = ValueOf<typeof USER_ROLES>;

export type UserStatus = ValueOf<typeof USER_STATUSES>;

export type DevicePlatform = ValueOf<typeof DEVICE_PLATFORMS>;

export type FileType = ValueOf<typeof FILE_TYPES>;

export type FileAccessMode = ValueOf<typeof FILE_ACCESS_MODES>;

export type AuthGrantType = ValueOf<typeof AUTH_GRANT_TYPES>;

export type LoggedTokens = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type PaginationResponse = {
  _next: string | null;
};
`,
            "entity.type.ts": `import { FileAccessMode, FileType } from './common.type';

export type BaseEntity = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Category = {
  id: string;
  title: string;
  description: string;
  children: Category[];
  parentId: string;
  parent?: Category;
};

export type File = BaseEntity & {
  filePath: string;
  productId: string;
};

export type FileItem = BaseEntity &
  Partial<{
    user?: User;
    userId?: string;
    product?: Product;
    productId?: string;
    path: string;
    url?: string;
    type: FileType;
    category: Category;
    accessMode: FileAccessMode;
    isTemp: boolean;
  }>;

export type Product = BaseEntity &
  Partial<{
    category: Category;
    categoryId: string;
    user: User;
    userId: string;
    title: string;
    totalQuantity: number;
    totalSold: number;
    price: number;
    rating: number;
    ratingCount: number;
    description: string;
    countBookmarks: number;
    imagePaths: string[];
    images: FileItem[];
  }>;

export type User = BaseEntity &
  Partial<{
    firstName: string;
    lastName: string;
    roleId: string;
    id: string;
    avatar: string | null;
    email: string;
  }>;
`,
            "index.ts": `export * from './api-request.type';
export * from './api.response.type';
export * from './common.type';
export * from './entity.type';
`,
        },
        utils: {
            "appendFromData.ts": `const appendFromData = (data: { [s: string]: unknown; } | ArrayLike<unknown>) => {
  if (data) {
    const formData = new FormData();
    for (const [k, v] of Object.entries(data)) {
      formData.append(k, v as Blob);
    }
    return formData;
  }
  return null;
};

export default appendFromData;
`,
            "delay.ts": `const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default delay;
`,
            "loadable.tsx": `/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy, Suspense } from 'react';

type Unpromisify<T> = T extends Promise<infer P> ? P : never;

export const lazyLoad = <T extends Promise<any>, U extends React.ComponentType<any>>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => U,
) => {
  let lazyFactory: () => Promise<{ default: U }> = importFunc;

  if (selectorFunc) {
    lazyFactory = () => importFunc().then(module => ({ default: selectorFunc(module) }));
  }

  const LazyComponent = lazy(lazyFactory);

  return (props: React.ComponentProps<U>): JSX.Element => (
    <Suspense>
      <LazyComponent {...props} />
    </Suspense>
  );
};
`,
            "index.ts": `export * from './loadable';
export * from './delay';
`,
        },
        "main.tsx": `import '@/styles/global.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        "App.tsx": `import { ThemeProvider } from '@/components/theme-provider';
import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
`,
    },
    "components.json": JSON.stringify(
        {
            $schema: "https://ui.shadcn.com/schema.json",
            style: "new-york",
            rsc: true,
            tsx: true,
            tailwind: {
                config: "tailwind.config.js",
                css: "src/styles/global.css",
                baseColor: "zinc",
                cssVariables: true,
                prefix: "",
            },
            aliases: {
                components: "src/components",
                utils: "src/lib/utils",
            },
        },
        null,
        2
    ),
    ".prettierrc": JSON.stringify(
        {
            semi: true,
            singleQuote: true,
            jsxSingleQuote: true,
            trailingComma: "all",
            printWidth: 120,
            tabWidth: 2,
            endOfLine: "lf",
            arrowParens: "avoid",
            bracketSpacing: true,
        },
        null,
        2
    ),
    ".prettierignore": `# Ignore artifacts:\ndist\nnode_modules\npackage-lock.json\nyarn.lock\n`,
    ".env": `VITE_BASE_URL=https://base-url.com\nVITE_STORAGE_URL=https://storage-url.amazonaws.com\n`,
};

module.exports = structure;
