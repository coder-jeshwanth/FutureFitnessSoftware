import React, { useState } from 'react';
import { Search, Edit, Trash2, Dumbbell, Clock, Target } from 'lucide-react';

const workoutPlans = [
  {
    id: 1,
    name: 'Beginner Strength Training',
    description: 'Perfect for those new to weight training',
    duration: '45 minutes',
    difficulty: 'Beginner',
    category: 'Strength',
    exercises: 8,
    trainer: 'Vikash Kumar',
    assignedMembers: 15,
    createdDate: '2024-01-15'
  },
  {
    id: 2,
    name: 'Advanced HIIT Workout',
    description: 'High-intensity interval training for fat loss',
    duration: '30 minutes',
    difficulty: 'Advanced',
    category: 'Cardio',
    exercises: 12,
    trainer: 'Raj Singh',
    assignedMembers: 22,
    createdDate: '2024-02-08'
  },
  {
    id: 3,
    name: 'Yoga Flow for Flexibility',
    description: 'Improve flexibility and mindfulness',
    duration: '60 minutes',
    difficulty: 'Intermediate',
    category: 'Flexibility',
    exercises: 20,
    trainer: 'Sneha Reddy',
    assignedMembers: 28,
    createdDate: '2024-01-22'
  },
  {
    id: 4,
    name: 'Full Body Circuit',
    description: 'Complete body workout in circuit format',
    duration: '50 minutes',
    difficulty: 'Intermediate',
    category: 'Circuit',
    exercises: 15,
    trainer: 'Priya Sharma',
    assignedMembers: 18,
    createdDate: '2024-03-01'
  }
];

const exerciseLibrary = [
  { id: 1, name: 'Push-ups', category: 'Chest', icon: '💪' },
  { id: 2, name: 'Squats', category: 'Legs', icon: '🦵' },
  { id: 3, name: 'Bench Press', category: 'Chest', icon: '🏋️' },
  { id: 4, name: 'Deadlift', category: 'Back', icon: '⬆️' },
  { id: 5, name: 'Mountain Climbers', category: 'Cardio', icon: '🏔️' },
  { id: 6, name: 'Plank', category: 'Core', icon: '📏' },
  { id: 7, name: 'Burpees', category: 'Full Body', icon: '🤸' },
  { id: 8, name: 'Lunges', category: 'Legs', icon: '👣' }
];

const WorkoutPlans: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [workoutExercises, setWorkoutExercises] = useState<any[]>([]);
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanDescription, setNewPlanDescription] = useState('');
  const [newPlanCategory, setNewPlanCategory] = useState('');
  const [newPlanDifficulty, setNewPlanDifficulty] = useState('');
  const [draggedExercise, setDraggedExercise] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterDifficulty, setFilterDifficulty] = useState('All Difficulty');
  const [sortBy, setSortBy] = useState('Newest');
  const [newPlanDuration, setNewPlanDuration] = useState('');
  const [newPlanTrainer, setNewPlanTrainer] = useState('');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-900 text-green-300';
      case 'Intermediate': return 'bg-yellow-900 text-yellow-300';
      case 'Advanced': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-800 text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Strength': return 'bg-blue-900 text-blue-300';
      case 'Cardio': return 'bg-red-900 text-red-300';
      case 'Flexibility': return 'bg-purple-900 text-purple-300';
      case 'Circuit': return 'bg-orange-900 text-orange-300';
      default: return 'bg-gray-800 text-gray-300';
    }
  };
  
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'Strength': return 'from-blue-900/20 to-blue-800/5';
      case 'Cardio': return 'from-red-900/20 to-red-800/5';
      case 'Flexibility': return 'from-purple-900/20 to-purple-800/5';
      case 'Circuit': return 'from-orange-900/20 to-orange-800/5';
      default: return 'from-gray-800/20 to-gray-700/5';
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Strength': return '💪';
      case 'Cardio': return '🏃';
      case 'Flexibility': return '🧘';
      case 'Circuit': return '⚡';
      default: return '📋';
    }
  };

  const filteredPlans = workoutPlans.filter(plan => {
    // Text search filter
    const matchesSearch = 
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.trainer.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = 
      filterCategory === 'All Categories' || 
      plan.category === filterCategory;
    
    // Difficulty filter
    const matchesDifficulty = 
      filterDifficulty === 'All Difficulty' || 
      plan.difficulty === filterDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  }).sort((a, b) => {
    // Sorting logic based on selected option
    switch (sortBy) {
      case 'Newest':
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      case 'Most Popular':
        return b.assignedMembers - a.assignedMembers;
      case 'Duration':
        return parseInt(a.duration) - parseInt(b.duration);
      case 'Difficulty':
        const difficultyRank = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        return difficultyRank[a.difficulty as keyof typeof difficultyRank] - difficultyRank[b.difficulty as keyof typeof difficultyRank];
      default:
        return 0;
    }
  });

  const openPlanModal = (plan: any) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };
  
  const handleDragStart = (exercise: any) => {
    setDraggedExercise(exercise);
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (draggedExercise) {
      // Generate AI recommendations for sets, reps, and rest time based on exercise type and difficulty
      const suggestedSets = Math.floor(Math.random() * 3) + 2; // Random between 2-4 sets
      let suggestedReps, suggestedRest;
      
      // Customize based on exercise category
      switch(draggedExercise.category) {
        case 'Chest':
        case 'Back':
        case 'Legs':
          suggestedReps = '8-12';
          suggestedRest = '60-90s';
          break;
        case 'Core':
          suggestedReps = '12-15';
          suggestedRest = '45-60s';
          break;
        case 'Cardio':
          suggestedReps = '30s';
          suggestedRest = '15s';
          break;
        case 'Full Body':
          suggestedReps = '10-15';
          suggestedRest = '30-45s';
          break;
        default:
          suggestedReps = '10-12';
          suggestedRest = '60s';
      }
      
      // Add to workout plan with AI-suggested parameters
      const newExercise = {
        ...draggedExercise,
        sets: suggestedSets,
        reps: suggestedReps,
        rest: suggestedRest,
        order: workoutExercises.length + 1
      };
      
      // Add with a slight delay for better visual feedback
      setTimeout(() => {
        setWorkoutExercises([...workoutExercises, newExercise]);
      }, 100);
      setDraggedExercise(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedExercise(null);
  };
  
  const removeExercise = (id: number) => {
    setWorkoutExercises(workoutExercises.filter(ex => ex.id !== id));
  };

  return (
    <div className="space-y-6 bg-[#2A3037] p-6 rounded-lg min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Create and manage workout plans</h2>
        </div>
        <div>
          <button 
            onClick={() => {
              setSelectedPlan(null);
              setShowModal(true);
            }}
            className="bg-[#7BC843] hover:bg-[#6AB732] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 shadow-md"
          >
            <Dumbbell className="h-5 w-5" />
            <span>Create Workout Plan</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-[#3a4148] rounded-xl shadow-sm border border-gray-700 p-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search workout plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#2A3037] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#7BC843] focus:border-[#7BC843] placeholder-gray-400"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="min-w-[140px] px-4 py-3 bg-[#2A3037] border border-gray-700 text-white rounded-lg 
                           focus:ring-2 focus:ring-[#7BC843] focus:border-[#7BC843] appearance-none pr-10
                           hover:bg-[#3a4148] hover:border-[#7BC843] transition-all duration-200"
              >
                <option>All Categories</option>
                <option>Strength</option>
                <option>Cardio</option>
                <option>Flexibility</option>
                <option>Circuit</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="relative">
              <select 
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="min-w-[140px] px-4 py-3 bg-[#2A3037] border border-gray-700 text-white rounded-lg 
                           focus:ring-2 focus:ring-[#7BC843] focus:border-[#7BC843] appearance-none pr-10
                           hover:bg-[#3a4148] hover:border-[#7BC843] transition-all duration-200"
              >
                <option>All Difficulty</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="min-w-[140px] px-4 py-3 bg-[#2A3037] border border-gray-700 text-white rounded-lg 
                           focus:ring-2 focus:ring-[#7BC843] focus:border-[#7BC843] appearance-none pr-10
                           hover:bg-[#3a4148] hover:border-[#7BC843] transition-all duration-200"
              >
                <option>Newest</option>
                <option>Most Popular</option>
                <option>Duration</option>
                <option>Difficulty</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workout Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div 
            key={plan.id} 
            onClick={() => openPlanModal(plan)} 
            className={`bg-gradient-to-br ${getCategoryGradient(plan.category)} 
                       bg-[#3a4148] rounded-xl shadow-sm border border-gray-700 p-6 
                       hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] 
                       hover:border-[#7BC843] hover:border-opacity-70 
                       cursor-pointer transition-all duration-300 relative overflow-hidden`}
          >
            {/* Difficulty Badge (Top Right) */}
            <div className="absolute top-2 right-2 z-10">
              <span className={`px-3 py-1 rounded-full text-xs font-medium 
                              shadow-md ${getDifficultyColor(plan.difficulty)}`}>
                {plan.difficulty}
              </span>
            </div>
            
            <div className="flex items-start mb-6">
              {/* Category Icon */}
              <div className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl bg-[#2A3037]/70 mr-4 shadow-md border border-gray-700">
                {getCategoryIcon(plan.category)}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-300 text-sm line-clamp-2">{plan.description}</p>
                <div className="flex items-center mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(plan.category)}`}>
                    {plan.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">Duration:</span>
                </div>
                <span className="text-white font-medium">{plan.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">Exercises:</span>
                </div>
                <span className="text-white font-medium">{plan.exercises}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Trainer:</span>
                <span className="text-white font-medium">{plan.trainer}</span>
              </div>
              
              {/* Popularity Indicator */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Popularity:</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-4 mx-0.5 rounded-sm ${
                      i < Math.ceil(plan.assignedMembers / 10) 
                        ? 'bg-[#7BC843]' 
                        : 'bg-gray-600'
                    }`}></div>
                  ))}
                  <span className="text-white text-xs ml-2">{plan.assignedMembers}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan(null);
                    setWorkoutExercises([]);
                    setShowModal(true);
                    setNewPlanName(plan.name);
                    setNewPlanDescription(plan.description);
                    setNewPlanCategory(plan.category);
                    setNewPlanDifficulty(plan.difficulty);
                    setIsEditMode(true);
                  }}
                  className="p-2 text-gray-300 hover:text-white hover:bg-[#2A3037] rounded-lg transition-colors duration-200" 
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={(e) => e.stopPropagation()} 
                  className="p-2 text-gray-300 hover:text-white hover:bg-[#2A3037] rounded-lg transition-colors duration-200" 
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              {/* Dates */}
              <div className="text-right">
                <div className="text-xs text-gray-500">Created: {new Date(plan.createdDate).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Workout Plan Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedPlan ? selectedPlan.name : isEditMode ? 'Edit Workout Plan' : 'Create New Workout Plan'}
                  </h2>
                  {selectedPlan && (
                    <>
                      <p className="text-gray-300 mt-1">{selectedPlan.description}</p>
                      <div className="flex items-center space-x-3 mt-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedPlan.category)}`}>
                          {selectedPlan.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedPlan.difficulty)}`}>
                          {selectedPlan.difficulty}
                        </span>
                      </div>
                    </>
                  )}
                  {!selectedPlan && (
                    <p className="text-gray-300 mt-1">Create a new workout plan for your members</p>
                  )}
                </div>
                <button 
                  onClick={() => {
                    setShowModal(false);
                    setIsEditMode(false);
                  }}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 text-white">
              {selectedPlan ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-white mb-4">Exercise List</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Warm-up: Light Cardio', sets: '-', reps: '5 minutes', rest: '-' },
                        { name: 'Push-ups', sets: '3', reps: '12-15', rest: '60s' },
                        { name: 'Squats', sets: '3', reps: '15-20', rest: '60s' },
                        { name: 'Plank', sets: '3', reps: '30-45s', rest: '45s' },
                        { name: 'Lunges', sets: '3', reps: '12 each leg', rest: '60s' },
                        { name: 'Mountain Climbers', sets: '3', reps: '20', rest: '45s' },
                        { name: 'Cool-down: Stretching', sets: '-', reps: '5 minutes', rest: '-' }
                      ].map((exercise, index) => (
                        <div key={index} className="bg-[#3a4148] rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-white">{exercise.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-300">
                              <span>Sets: {exercise.sets}</span>
                              <span>Reps: {exercise.reps}</span>
                              <span>Rest: {exercise.rest}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Plan Details</h3>
                    <div className="space-y-4">
                      <div className="bg-[#3a4148] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Duration:</span>
                          <span className="text-white font-medium">{selectedPlan.duration}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Exercises:</span>
                          <span className="text-white font-medium">{selectedPlan.exercises}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Created by:</span>
                          <span className="text-white font-medium">{selectedPlan.trainer}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Assigned to:</span>
                          <span className="text-white font-medium">{selectedPlan.assignedMembers} members</span>
                        </div>
                      </div>

                      <div className="bg-[#3a4148] rounded-lg p-4">
                        <h4 className="font-medium text-white mb-3">Equipment Needed</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Dumbbells', 'Mat', 'Resistance Bands'].map((equipment, index) => (
                            <span key={index} className="px-2 py-1 bg-[#2A3037] rounded-full text-sm text-gray-300">
                              {equipment}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#3a4148] rounded-lg p-4">
                        <h4 className="font-medium text-white mb-3">Target Muscles</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Chest', 'Legs', 'Core', 'Arms'].map((muscle, index) => (
                            <span key={index} className="px-2 py-1 bg-[#7BC843] text-black rounded-full text-sm">
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Plan Details</h3>
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="text"
                          id="planName"
                          className="block w-full px-4 pt-5 pb-2 bg-[#3a4148] border border-gray-700 rounded-lg 
                                   focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white 
                                   peer placeholder-transparent"
                          placeholder="Plan Name"
                          value={newPlanName}
                          onChange={(e) => setNewPlanName(e.target.value)}
                        />
                        <label 
                          htmlFor="planName"
                          className="absolute text-sm font-medium text-gray-400 duration-300 transform 
                                   -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4
                                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                   peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#7BC843]"
                        >
                          Plan Name
                        </label>
                      </div>
                      
                      <div className="relative">
                        <textarea
                          id="planDescription"
                          rows={3}
                          className="block w-full px-4 pt-5 pb-2 bg-[#3a4148] border border-gray-700 rounded-lg 
                                   focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white 
                                   peer placeholder-transparent"
                          placeholder="Description"
                          value={newPlanDescription}
                          onChange={(e) => setNewPlanDescription(e.target.value)}
                        />
                        <label 
                          htmlFor="planDescription"
                          className="absolute text-sm font-medium text-gray-400 duration-300 transform 
                                   -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4
                                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                   peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#7BC843]"
                        >
                          Description
                        </label>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <select 
                            id="planCategory"
                            className="block w-full px-4 pt-5 pb-2 bg-[#3a4148] border border-gray-700 rounded-lg 
                                     focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white 
                                     appearance-none peer"
                            value={newPlanCategory}
                            onChange={(e) => setNewPlanCategory(e.target.value)}
                          >
                            <option value="">Select category</option>
                            <option value="Strength">Strength</option>
                            <option value="Cardio">Cardio</option>
                            <option value="Flexibility">Flexibility</option>
                            <option value="Circuit">Circuit</option>
                          </select>
                          <label 
                            htmlFor="planCategory"
                            className="absolute text-sm font-medium text-gray-400 duration-300 transform 
                                     -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4
                                     peer-focus:text-[#7BC843]"
                          >
                            Category
                          </label>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative">
                          <select 
                            id="planDifficulty"
                            className="block w-full px-4 pt-5 pb-2 bg-[#3a4148] border border-gray-700 rounded-lg 
                                     focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white 
                                     appearance-none peer"
                            value={newPlanDifficulty}
                            onChange={(e) => setNewPlanDifficulty(e.target.value)}
                          >
                            <option value="">Select difficulty</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                          <label 
                            htmlFor="planDifficulty"
                            className="absolute text-sm font-medium text-gray-400 duration-300 transform 
                                     -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4
                                     peer-focus:text-[#7BC843]"
                          >
                            Difficulty
                          </label>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <select
                            id="planDuration" 
                            className="block w-full px-4 pt-5 pb-2 bg-[#3a4148] border border-gray-700 rounded-lg 
                                     focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white 
                                     appearance-none peer"
                            value={newPlanDuration}
                            onChange={(e) => setNewPlanDuration(e.target.value)}
                          >
                            <option value="">Select duration</option>
                            <option value="15 minutes">15 minutes</option>
                            <option value="30 minutes">30 minutes</option>
                            <option value="45 minutes">45 minutes</option>
                            <option value="60 minutes">60 minutes</option>
                            <option value="90 minutes">90 minutes</option>
                          </select>
                          <label 
                            htmlFor="planDuration"
                            className="absolute text-sm font-medium text-gray-400 duration-300 transform 
                                     -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4
                                     peer-focus:text-[#7BC843]"
                          >
                            Duration
                          </label>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative">
                          <select 
                            id="planTrainer"
                            className="block w-full px-4 pt-5 pb-2 bg-[#3a4148] border border-gray-700 rounded-lg 
                                     focus:ring-2 focus:ring-[#7BC843] focus:border-transparent text-white 
                                     appearance-none peer"
                            value={newPlanTrainer}
                            onChange={(e) => setNewPlanTrainer(e.target.value)}
                          >
                            <option value="">Select trainer</option>
                            <option value="Sneha Reddy">Sneha Reddy</option>
                            <option value="Raj Singh">Raj Singh</option>
                            <option value="Vikash Kumar">Vikash Kumar</option>
                            <option value="Priya Sharma">Priya Sharma</option>
                          </select>
                          <label 
                            htmlFor="planTrainer"
                            className="absolute text-sm font-medium text-gray-400 duration-300 transform 
                                     -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4
                                     peer-focus:text-[#7BC843]"
                          >
                            Trainer
                          </label>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-white">Exercise Library</h3>
                      <p className="text-sm text-gray-300">Drag and drop exercises</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4 max-h-[200px] overflow-y-auto">
                      {exerciseLibrary.map((exercise) => (
                        <div 
                          key={exercise.id} 
                          className="bg-[#3a4148] hover:bg-[#4a5158] rounded-lg p-3 cursor-grab transition-colors duration-200 border-2 border-transparent hover:border-[#165D31] active:cursor-grabbing"
                          draggable
                          onDragStart={(e) => {
                            handleDragStart(exercise);
                            e.currentTarget.classList.add('opacity-50');
                          }}
                          onDragEnd={(e) => {
                            e.currentTarget.classList.remove('opacity-50');
                            handleDragEnd();
                          }}
                        >
                          <div className="text-xl mb-1">{exercise.icon}</div>
                          <h4 className="font-medium text-white text-sm">{exercise.name}</h4>
                          <p className="text-xs text-gray-300">{exercise.category}</p>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-3">Plan Exercises</h3>
                    <div 
                      className="border-2 border-dashed border-gray-700 rounded-lg p-4 min-h-[200px] bg-[#2A3037] transition-colors duration-200"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onDragEnter={(e) => e.currentTarget.classList.add('border-[#165D31]')}
                      onDragLeave={(e) => e.currentTarget.classList.remove('border-[#165D31]')}
                    >
                      {workoutExercises.length > 0 ? (
                        <div className="space-y-3 max-h-[180px] overflow-y-auto pr-2">
                          {workoutExercises.map((exercise, index) => {
                            const isNew = exercise.order === workoutExercises.length;
                            return (
                              <div 
                                key={`workout-${exercise.id}-${index}`} 
                                className={`bg-[#3a4148] rounded-lg p-3 relative ${isNew ? 'animate-highlight' : ''}`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="text-lg">{exercise.icon}</div>
                                    <div>
                                      <h4 className="font-medium text-white text-sm">{exercise.name}</h4>
                                      <div className="flex items-center text-xs text-gray-300 mt-1">
                                        <span className="mr-2">Sets: {exercise.sets}</span>
                                        <span className="mr-2">Reps: {exercise.reps}</span>
                                        <span>Rest: {exercise.rest}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <button 
                                    onClick={() => removeExercise(exercise.id)}
                                    className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-[#2A3037]"
                                    title="Remove exercise"
                                  >
                                    ×
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center text-gray-400">
                          <Dumbbell className="h-10 w-10 mx-auto mb-3" />
                          <p>Drag exercises here to build your workout plan</p>
                          <p className="text-sm mt-2">AI will automatically suggest sets, reps, and rest periods</p>
                        </div>
                      )}
                    </div>
                    
                    {workoutExercises.length > 0 && (
                      <div className="mt-3 p-3 bg-[#7BC843] bg-opacity-10 rounded-lg text-xs">
                        <p className="font-medium text-white">AI has suggested optimal parameters for {workoutExercises.length} exercises</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end space-x-4">
                {selectedPlan ? (
                  <>
                    <button className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-[#3a4148] transition-colors duration-200">
                      Duplicate Plan
                    </button>
                    <button 
                      onClick={() => {
                        // Convert selected plan to editable mode
                        setWorkoutExercises([]);
                        setNewPlanName(selectedPlan.name);
                        setNewPlanDescription(selectedPlan.description);
                        setNewPlanCategory(selectedPlan.category);
                        setNewPlanDifficulty(selectedPlan.difficulty);
                        setIsEditMode(true);
                        // Trigger edit mode by clearing selected plan
                        setSelectedPlan(null);
                      }}
                      className="px-6 py-3 bg-[#3a4148] hover:bg-[#4a5158] text-white rounded-lg transition-colors duration-200"
                    >
                      Edit Plan
                    </button>
                    <button className="px-6 py-3 bg-[#7BC843] hover:bg-[#6AB732] text-black rounded-lg transition-colors duration-200 font-medium shadow-md">
                      Assign to Members
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        setShowModal(false);
                        setIsEditMode(false);
                        
                        // Reset the form
                        setWorkoutExercises([]);
                        setNewPlanName('');
                        setNewPlanDescription('');
                        setNewPlanCategory('');
                        setNewPlanDifficulty('');
                      }}
                      className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-[#3a4148] transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        if (newPlanName && workoutExercises.length > 0) {
                          // Here you would typically save the workout plan
                          const message = isEditMode 
                            ? `Workout plan "${newPlanName}" updated successfully!` 
                            : `Workout plan "${newPlanName}" created successfully with ${workoutExercises.length} exercises!`;
                          
                          alert(message);
                          setShowModal(false);
                          
                          // Reset the form
                          setWorkoutExercises([]);
                          setNewPlanName('');
                          setNewPlanDescription('');
                          setNewPlanCategory('');
                          setNewPlanDifficulty('');
                          setIsEditMode(false);
                        }
                      }}
                      disabled={!newPlanName || workoutExercises.length === 0}
                      className={`px-6 py-3 ${(!newPlanName || workoutExercises.length === 0) 
                        ? 'bg-gray-700 cursor-not-allowed' 
                        : 'bg-[#7BC843] hover:bg-[#6AB732] cursor-pointer'} ${isDragging ? 'text-white' : 'text-black'} rounded-lg transition-colors duration-200`}
                    >
                      {isEditMode ? 'Update Plan' : 'Create Plan'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Workout Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A3037] rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Workout Plan Builder</h2>
                <button 
                  onClick={() => setShowBuilder(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 text-white relative">
              {isDragging && (
                <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-[#7BC843] text-black px-4 py-2 rounded-lg shadow-lg font-medium">
                    <p className="font-medium">Drop in workout plan area to add</p>
                    <p className="text-sm">AI will automatically suggest sets, reps and rest times</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Exercise Library */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Exercise Library</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {exerciseLibrary.map((exercise) => (
                      <div 
                        key={exercise.id} 
                        className="bg-[#3a4148] hover:bg-[#4a5158] rounded-lg p-4 cursor-grab transition-colors duration-200 border-2 border-transparent hover:border-[#165D31] active:cursor-grabbing"
                        draggable
                        onDragStart={(e) => {
                          handleDragStart(exercise);
                          e.currentTarget.classList.add('opacity-50');
                        }}
                        onDragEnd={(e) => {
                          e.currentTarget.classList.remove('opacity-50');
                          handleDragEnd();
                        }}
                      >
                        <div className="text-2xl mb-2">{exercise.icon}</div>
                        <h4 className="font-medium text-white text-sm">{exercise.name}</h4>
                        <p className="text-xs text-gray-300">{exercise.category}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workout Builder */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Current Workout Plan</h3>
                  <div 
                    className="border-2 border-dashed border-gray-700 rounded-lg p-6 min-h-[400px] bg-[#2A3037] transition-colors duration-200"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragEnter={(e) => e.currentTarget.classList.add('border-[#165D31]')}
                    onDragLeave={(e) => e.currentTarget.classList.remove('border-[#165D31]')}
                  >
                    {workoutExercises.length > 0 ? (
                      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2">
                        {workoutExercises.map((exercise, index) => {
                          const isNew = exercise.order === workoutExercises.length;
                          return (
                            <div 
                              key={`workout-${exercise.id}-${index}`} 
                              className={`bg-[#3a4148] rounded-lg p-3 relative ${isNew ? 'animate-highlight' : ''}`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="text-xl">{exercise.icon}</div>
                                  <div>
                                    <h4 className="font-medium text-white text-sm">{exercise.name}</h4>
                                    <p className="text-xs text-gray-300">{exercise.category}</p>
                                  </div>
                                </div>
                                
                                <button 
                                  onClick={() => removeExercise(exercise.id)}
                                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-[#2A3037]"
                                  title="Remove exercise"
                                >
                                  ×
                                </button>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                                <div className="bg-[#2A3037] p-2 rounded text-center">
                                  <span className="block text-white">{exercise.sets}</span>
                                  <span className="text-xs text-gray-400">Sets</span>
                                </div>
                                <div className="bg-[#2A3037] p-2 rounded text-center">
                                  <span className="block text-white">{exercise.reps}</span>
                                  <span className="text-xs text-gray-400">Reps</span>
                                </div>
                                <div className="bg-[#2A3037] p-2 rounded text-center">
                                  <span className="block text-white">{exercise.rest}</span>
                                  <span className="text-xs text-gray-400">Rest</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center text-gray-400">
                        <Dumbbell className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                        <p>Drag exercises here to build your workout plan</p>
                        <p className="text-sm mt-2">AI will automatically suggest sets, reps, and rest periods</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <input
                      type="text"
                      placeholder="Workout plan name"
                      value={newPlanName}
                      onChange={(e) => setNewPlanName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white placeholder-gray-400"
                    />
                    <textarea
                      placeholder="Description"
                      value={newPlanDescription}
                      onChange={(e) => setNewPlanDescription(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white placeholder-gray-400"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <select 
                        className="px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                        value={newPlanCategory}
                        onChange={(e) => setNewPlanCategory(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        <option value="Strength">Strength</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Flexibility">Flexibility</option>
                        <option value="Circuit">Circuit</option>
                      </select>
                      <select 
                        className="px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                        value={newPlanDifficulty}
                        onChange={(e) => setNewPlanDifficulty(e.target.value)}
                      >
                        <option value="">Select Difficulty</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {workoutExercises.length > 0 && (
                  <div className="p-4 bg-[#7BC843] bg-opacity-10 rounded-lg mb-4 text-sm">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">✓</div>
                      <div>
                        <p className="font-medium text-white">AI-generated workout ready!</p>
                        <p className="text-gray-300 mt-1">
                          {workoutExercises.length} exercises added with AI-recommended parameters. 
                          You can adjust the sets, reps, and rest times as needed before saving.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              
                <div className="flex justify-end space-x-4">
                  <button 
                    onClick={() => setShowBuilder(false)}
                    className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-[#3a4148] transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      // You would typically save the workout plan here
                      alert('Workout plan saved successfully!');
                      setShowBuilder(false);
                      // Reset the form
                      setWorkoutExercises([]);
                      setNewPlanName('');
                      setNewPlanDescription('');
                      setNewPlanCategory('');
                      setNewPlanDifficulty('');
                    }}
                    disabled={!newPlanName || workoutExercises.length === 0}
                    className={`px-6 py-3 ${(!newPlanName || workoutExercises.length === 0) 
                      ? 'bg-gray-700 cursor-not-allowed' 
                      : 'bg-[#7BC843] hover:bg-[#6AB732] cursor-pointer'} ${isDragging ? 'text-white' : 'text-black'} rounded-lg transition-colors duration-200`}
                  >
                    Save Workout Plan
                  </button>
                </div>
                
                {(!newPlanName || workoutExercises.length === 0) && (
                  <p className="text-gray-400 text-xs mt-3 text-right">
                    {!newPlanName && '• Plan name is required. '}
                    {workoutExercises.length === 0 && '• Add at least one exercise. '}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlans;