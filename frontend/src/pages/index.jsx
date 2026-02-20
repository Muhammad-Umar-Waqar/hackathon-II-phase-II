import React from 'react';
import { useRouter } from 'next/router';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useSession, signOut } from '@/lib/auth-client';

const HomePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center h-auto sm:h-16 py-3 sm:py-0">
            <div className="mb-2 sm:mb-0">
              <h1 className="text-xl font-semibold text-gray-900">Todo App</h1>
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto">
              <span className="text-sm text-gray-700 hidden md:inline">Welcome, {user.name || user.email}</span>
              <span className="text-sm text-gray-700 sm:hidden truncate max-w-[120px]">Hi, {user.name || user.email}</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md transition-colors ml-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Manage Your Tasks</h2>
          <p className="text-gray-600 text-sm sm:text-base">Create, update, and track your tasks efficiently</p>
        </div>

        <TaskForm />

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Your Tasks</h2>
          <TaskList
            userId={user.id}
            onTaskUpdate={(updatedTask) => {
              console.log('Task updated:', updatedTask);
            }}
            onTaskDelete={(deletedTaskId) => {
              console.log('Task deleted:', deletedTaskId);
            }}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <p className="text-center text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} Todo App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;