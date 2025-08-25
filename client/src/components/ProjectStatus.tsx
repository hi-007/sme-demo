import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { MoreHorizontal, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

const projects = [
  {
    id: 1,
    title: 'Web Design',
    subtitle: 'Design team Management System',
    category: 'UI/UX Design',
    progress: 55.23,
    date: 'June 08, 2021',
    status: 'active',
    color: 'blue',
    team: [
      { name: 'John', avatar: '👨‍💻' },
      { name: 'Jane', avatar: '👩‍💻' },
      { name: 'Bob', avatar: '👨‍🎨' },
    ]
  },
  {
    id: 2,
    title: 'Mobile App',
    subtitle: 'Ecommerce Application',
    category: 'Ecommerce',
    progress: 14.84,
    date: 'May 01, 2021',
    status: 'active',
    color: 'pink',
    team: [
      { name: 'Alice', avatar: '👩‍💼' },
      { name: 'Charlie', avatar: '👨‍💻' },
      { name: 'David', avatar: '👨‍🎨' },
    ]
  },
  {
    id: 3,
    title: 'Design System',
    subtitle: 'Create CMS design system on figma',
    category: 'LMS',
    progress: 87.40,
    date: 'September 16, 2021',
    status: 'completed',
    color: 'orange',
    team: [
      { name: 'Eve', avatar: '👩‍🎨' },
      { name: 'Frank', avatar: '👨‍💻' },
      { name: 'Grace', avatar: '👩‍💻' },
    ]
  },
];

const colorClasses = {
  blue: 'border-l-dashboard-blue',
  pink: 'border-l-dashboard-pink',
  orange: 'border-l-dashboard-orange',
};

export const ProjectStatus = () => {
  return (
    <Card className="dashboard-card p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Projects Status</h3>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className={cn(
            'p-4 border-l-4 bg-white/50 rounded-lg hover:bg-white/80 transition-colors',
            colorClasses[project.color as keyof typeof colorClasses]
          )}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 mb-1">{project.title}</h4>
                <p className="text-sm text-slate-600 mb-2">{project.subtitle}</p>
                <Badge variant="secondary" className="text-xs">
                  {project.category}
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="dashboard-metric text-lg">%{project.progress}</div>
              <p className="text-xs text-slate-500">{project.date}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {project.team.map((member, index) => (
                  <Avatar key={index} className="w-8 h-8 border-2 border-white">
                    <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              
              <div className="progress-bar w-24">
                <div 
                  className={cn('progress-fill', {
                    'bg-dashboard-blue': project.color === 'blue',
                    'bg-dashboard-pink': project.color === 'pink',
                    'bg-dashboard-orange': project.color === 'orange',
                  })}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
