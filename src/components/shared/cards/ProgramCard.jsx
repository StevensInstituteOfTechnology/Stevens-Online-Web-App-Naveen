import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Clock, BookOpen, Globe } from "lucide-react";

export default function ProgramCard({ program, showDetails = true }) {
  const getPageName = (code) => {
    switch(code) {
      case 'mba': return 'MBA';
      case 'mscs': return 'MSCS';
      case 'mem': return 'MEM';
      default: return 'Program';
    }
  };

  return (
    <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-stevens-white">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Badge className="bg-red-100 text-red-800 mb-2">
              {program.code.toUpperCase()}
            </Badge>
            <CardTitle className="text-2xl font-bold text-stevens-black leading-tight">
              {program.title}
            </CardTitle>
            {program.subtitle && (
              <p className="text-stevens-dark-gray mt-1 font-medium">{program.subtitle}</p>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {program.overview && (
          <p className="text-stevens-dark-gray mb-6 leading-relaxed">
            {program.overview.length > 150 
              ? `${program.overview.substring(0, 150)}...` 
              : program.overview
            }
          </p>
        )}

        {showDetails && (
          <div className="space-y-3 mb-6">
            {program.credits && (
              <div className="flex items-center text-sm text-stevens-dark-gray">
                <BookOpen className="w-4 h-4 mr-2 text-red-600" />
                <span className="font-medium">Credits:</span>
                <span className="ml-1">{program.credits}</span>
              </div>
            )}
            {program.duration && (
              <div className="flex items-center text-sm text-stevens-dark-gray">
                <Clock className="w-4 h-4 mr-2 text-red-600" />
                <span className="font-medium">Duration:</span>
                <span className="ml-1">{program.duration}</span>
              </div>
            )}
            {program.delivery && (
              <div className="flex items-center text-sm text-stevens-dark-gray">
                <Globe className="w-4 h-4 mr-2 text-red-600" />
                <span className="font-medium">Format:</span>
                <span className="ml-1">{program.delivery}</span>
              </div>
            )}
          </div>
        )}

        {program.key_skills && program.key_skills.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-stevens-black mb-2">Key Skills:</p>
            <div className="flex flex-wrap gap-1">
              {program.key_skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {program.key_skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{program.key_skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <Link to={createPageUrl(getPageName(program.code))}>
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">
            Learn More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}