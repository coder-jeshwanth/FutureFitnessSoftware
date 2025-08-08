import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Dumbbell, Clock, Target, ChevronRight, Play } from 'lucide-react';

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Strength': return 'bg-blue-100 text-blue-800';
      case 'Cardio': return 'bg-red-100 text-red-800';
      case 'Flexibility': return 'bg-purple-100 text-purple-800';
      case 'Circuit': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPlans = workoutPlans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.trainer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openPlanModal = (plan: any) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  return (
    <div className="space-y-6 bg-[#2A3037] p-6 rounded-lg min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Create and manage workout plans</h2>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowBuilder(true)}
            className="bg-[#3a4148] hover:bg-[#4a5158] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Dumbbell className="h-5 w-5" />
            <span>Workout Builder</span>
          </button>
          <button 
            onClick={() => {
              setSelectedPlan(null);
              setShowModal(true);
            }}
            className="bg-[#165D31] hover:bg-[#073418] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create Plan</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-[#3a4148] rounded-xl shadow-sm border border-gray-700 p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search workout plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#2A3037] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#165D31] focus:border-transparent placeholder-gray-400"
            />
          </div>
          <div className="flex space-x-3">
            <select className="px-4 py-3 bg-[#2A3037] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent">
              <option>All Categories</option>
              <option>Strength</option>
              <option>Cardio</option>
              <option>Flexibility</option>
              <option>Circuit</option>
            </select>
            <select className="px-4 py-3 bg-[#2A3037] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent">
              <option>All Difficulty</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Workout Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="bg-[#3a4148] rounded-xl shadow-sm border border-gray-700 p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{plan.description}</p>
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(plan.category)}`}>
                    {plan.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(plan.difficulty)}`}>
                    {plan.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
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
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Assigned to:</span>
                <span className="text-white font-medium">{plan.assignedMembers} members</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => openPlanModal(plan)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-[#2A3037] rounded-lg transition-colors duration-200"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-300 hover:text-white hover:bg-[#2A3037] rounded-lg transition-colors duration-200" title="Edit">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-300 hover:text-white hover:bg-[#2A3037] rounded-lg transition-colors duration-200" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <button className="text-[#165D31] hover:text-white font-medium text-sm flex items-center space-x-1">
                <Play className="h-4 w-4" />
                <span>Preview</span>
              </button>
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
                    {selectedPlan ? selectedPlan.name : 'Create New Workout Plan'}
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
                  onClick={() => setShowModal(false)}
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
                            <span key={index} className="px-2 py-1 bg-[#165D31] text-white rounded-full text-sm">
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
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Plan Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                          placeholder="Enter plan name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                          rows={3}
                          className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                          placeholder="Describe the workout plan"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                          <select className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white">
                            <option>Select category</option>
                            <option>Strength</option>
                            <option>Cardio</option>
                            <option>Flexibility</option>
                            <option>Circuit</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                          <select className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white">
                            <option>Select difficulty</option>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Duration (minutes)</label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white"
                            placeholder="60"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Trainer</label>
                          <select className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white">
                            <option>Select trainer</option>
                            <option>Sneha Reddy</option>
                            <option>Raj Singh</option>
                            <option>Vikash Kumar</option>
                            <option>Priya Sharma</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Add Exercises</h3>
                    <div className="bg-[#3a4148] rounded-lg p-4 min-h-[300px] border border-gray-700 border-dashed">
                      <div className="text-center text-gray-400">
                        <Dumbbell className="h-10 w-10 mx-auto mb-3" />
                        <p className="font-medium">Select exercises to add to your plan</p>
                        <p className="text-sm mt-2">Click on "Add Exercise" to choose from the exercise library</p>
                      </div>
                    </div>
                    
                    <button className="mt-4 px-4 py-2 w-full bg-[#165D31] hover:bg-[#073418] text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Add Exercise</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end space-x-4">
                {selectedPlan ? (
                  <>
                    <button className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-[#3a4148] transition-colors duration-200">
                      Duplicate Plan
                    </button>
                    <button className="px-6 py-3 bg-[#3a4148] hover:bg-[#4a5158] text-white rounded-lg transition-colors duration-200">
                      Edit Plan
                    </button>
                    <button className="px-6 py-3 bg-[#165D31] hover:bg-[#073418] text-white rounded-lg transition-colors duration-200">
                      Assign to Members
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-[#3a4148] transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button className="px-6 py-3 bg-[#165D31] hover:bg-[#073418] text-white rounded-lg transition-colors duration-200">
                      Create Plan
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

            <div className="p-6 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Exercise Library */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Exercise Library</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {exerciseLibrary.map((exercise) => (
                      <div 
                        key={exercise.id} 
                        className="bg-[#3a4148] hover:bg-[#4a5158] rounded-lg p-4 cursor-pointer transition-colors duration-200 border-2 border-transparent hover:border-[#165D31]"
                        draggable
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
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 min-h-[400px] bg-[#2A3037]">
                    <div className="text-center text-gray-400">
                      <Dumbbell className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                      <p>Drag exercises here to build your workout plan</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <input
                      type="text"
                      placeholder="Workout plan name"
                      className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white placeholder-gray-400"
                    />
                    <textarea
                      placeholder="Description"
                      rows={3}
                      className="w-full px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white placeholder-gray-400"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <select className="px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white">
                        <option>Select Category</option>
                        <option>Strength</option>
                        <option>Cardio</option>
                        <option>Flexibility</option>
                        <option>Circuit</option>
                      </select>
                      <select className="px-4 py-3 bg-[#3a4148] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#165D31] focus:border-transparent text-white">
                        <option>Select Difficulty</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => setShowBuilder(false)}
                  className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-[#3a4148] transition-colors duration-200"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 bg-[#165D31] hover:bg-[#073418] text-white rounded-lg transition-colors duration-200">
                  Save Workout Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlans;